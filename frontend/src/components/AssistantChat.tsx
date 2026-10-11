import { useState, type FormEvent } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { askCodeGuardAssistant, type AssistantTurn } from '../services/gemini';
import ToggleSwitch from './ToggleSwitch';

export default function AssistantChat() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<AssistantTurn[]>([]);
  const [hasAiConsent, setHasAiConsent] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const hideOnActionPages = ['/compare', '/email-center', '/reports', '/student-response'].includes(pathname);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || isSending || !hasAiConsent) return;

    const nextHistory = [...history, { role: 'user' as const, text }];
    setHistory(nextHistory);
    setMessage('');
    setError('');
    setIsSending(true);
    try {
      const reply = await askCodeGuardAssistant(nextHistory);
      setHistory([...nextHistory, { role: 'assistant', text: reply }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to reach the AI assistant.');
    } finally {
      setIsSending(false);
    }
  };

  if (hideOnActionPages) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {isOpen && (
        <section aria-label="CodeGuard AI assistant" className="mb-3 flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#DDE4DC] bg-white shadow-[0_18px_60px_-18px_rgba(20,40,28,0.3)]">
          <header className="flex items-center justify-between bg-[#174C3C] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"><Bot size={20} /></div>
              <div>
                <h2 className="text-sm font-semibold">CodeGuard assistant</h2>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="rounded-lg p-2 transition hover:bg-white/15">
              <X size={18} />
            </button>
          </header>

          <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-[#F7F8F5] p-4">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-[#E3E7E0] bg-white px-3.5 py-3 text-sm leading-5 text-[#354139]">
              Hi! I can answer questions about CodeGuard and code review concepts. Similarity indicators are not proof of misconduct.
            </div>
            {history.map((turn, index) => (
              <div key={`${turn.role}-${index}`} className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-5 ${turn.role === 'user' ? 'ml-auto rounded-tr-sm bg-[#174C3C] text-white' : 'rounded-tl-sm border border-[#E3E7E0] bg-white text-[#354139]'}`}>
                {turn.text}
              </div>
            ))}
            {isSending && <p className="text-xs text-[#707A72]">Assistant is responding…</p>}
            {error && <p role="alert" className="rounded-xl border border-[#F5C7C3] bg-[#FBE8E6] px-3 py-2 text-xs leading-5 text-[#A82A2A]">{error}</p>}
          </div>

          <div className="border-t border-[#E3E7E0] bg-white p-3">
            <label className="mb-3 flex items-start gap-2 px-1 text-[10px] leading-4 text-[#707A72]">
              <ToggleSwitch
                checked={hasAiConsent}
                onChange={setHasAiConsent}
                label="Allow sending this chat to Google Gemini"
                className="mt-0.5"
              />
              <span>CodeGuard AI uses Google Gemini to process messages. I agree to send this chat, including prior messages, to Google. Do not share sensitive data.</span>
            </label>
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="assistant-message" className="sr-only">Message the CodeGuard assistant</label>
              <textarea
                id="assistant-message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                rows={2}
                maxLength={2000}
                placeholder="Ask a question..."
                className="max-h-28 min-h-10 flex-1 resize-y rounded-xl border border-[#D9DED8] px-3 py-2 text-sm outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
              />
              <button type="submit" disabled={isSending || !message.trim() || !hasAiConsent} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#174C3C] text-white transition hover:bg-[#10382D] disabled:cursor-not-allowed disabled:opacity-50">
                <Send size={17} />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isOpen}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#174C3C] text-white shadow-lg shadow-[#174C3C]/25 transition hover:-translate-y-0.5 hover:bg-[#10382D] focus:outline-none focus:ring-4 focus:ring-[#174C3C]/25"
      >
        {isOpen ? <X size={23} /> : <MessageCircle size={23} />}
      </button>
    </div>
  );
}
