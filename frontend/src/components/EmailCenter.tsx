import { useState } from 'react';
import {
  Mail,
  Send,
  RotateCcw,
  Eye,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { sendStudentEmail, isEmailJSConfigured } from '../services/emailService';
import { recordAuditEvent } from '../services/localAuditLog';
import ToggleSwitch from './ToggleSwitch';

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
}

const templates: Template[] = [
  {
    id: 'assignment_reminder',
    name: '1. Assignment Reminder',
    subject: 'Reminder about your assignment submission',
    body: `Dear {{student_name}},

This is a reminder to review the submission deadline provided for your assignment.

Please follow the submission instructions provided by your instructor.

If you have any questions, please contact your instructor.

Regards,
Your instructor`
  },
  {
    id: 'submission_received',
    name: '2. Submission Received',
    subject: 'Update about your submission',
    body: `Dear {{student_name}},

Please replace this message with an accurate update about your submission before sending.

Regards,
Your instructor`
  },
  {
    id: 'academic_review',
    name: '3. Preliminary Review Invitation',
    subject: 'Request to discuss your submission: {{case_reference}}',
    body: `Dear {{student_name}},

We would like to discuss questions about your submission for {{case_reference}}. A code-similarity indicator prompted a closer review; it is not a finding of misconduct and may reflect common course materials or assignment requirements.

You may explain your approach and identify any shared starter code, examples, or other context. Please use the institution's established process to ask for the relevant evidence, provide a response, or arrange a conversation. No conclusion has been reached.

Regards,
Your instructor`
  },
  {
    id: 'request_info',
    name: '4. Request for Additional Information',
    subject: 'Inquiry Regarding Implementation Strategy on {{case_reference}}',
    body: `Dear {{student_name}},

During code review of your recent assignment, certain algorithmic choices and external library dependencies were noted.

Could you please provide:
1. A brief explanation of the implementation choices relevant to your work.
2. Any course examples, starter code, or authorized resources relevant to your approach.

You may ask for clarification or use the institution's established response process. No conclusion has been reached.

Regards,
Your instructor`
  },
  {
    id: 'review_outcome',
    name: '5. Review Outcome',
    subject: 'Conclusion of Academic Review: {{case_reference}}',
    body: `Dear {{student_name}},

This is a draft template for communicating a review outcome for {{case_reference}}. Before sending, replace this text with the actual decision, reasons, relevant evidence, available appeal or response options, and the applicable institutional process. Do not send this generic template as a final decision.

Regards,
Your instructor`
  },
  {
    id: 'custom',
    name: '6. Custom Email',
    subject: '',
    body: ''
  }
];

export default function EmailCenter() {
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState(import.meta.env.EMAILJS_DEFAULT_RECIPIENT || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [caseRef, setCaseRef] = useState('');
  const [authorizedToSend, setAuthorizedToSend] = useState(false);
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const configured = isEmailJSConfigured();

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = templates.find(t => t.id === templateId);
    if (!tmpl) return;

    if (tmpl.id === 'custom') {
      setSubject('');
      setMessage('');
      return;
    }

    const filledSubject = tmpl.subject.replace('{{case_reference}}', caseRef);
    const filledBody = tmpl.body
      .replace(/{{student_name}}/g, toName || '{{student_name}}')
      .replace(/{{case_reference}}/g, caseRef || '{{case_reference}}');

    setSubject(filledSubject);
    setMessage(filledBody);
  };

  const handleClearForm = () => {
    setToName('');
    setToEmail('');
    setSubject('');
    setMessage('');
    setCaseRef('');
    setStatusFeedback(null);
  };

  const handleInitiateSend = () => {
    if (!authorizedToSend) {
      setStatusFeedback({ type: 'error', text: 'Confirm that you are authorized to share these details with EmailJS before sending.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail.trim())) {
      setStatusFeedback({ type: 'error', text: 'Please enter a valid recipient email address.' });
      return;
    }
    if (!subject.trim()) {
      setStatusFeedback({ type: 'error', text: 'Email subject cannot be empty.' });
      return;
    }
    if (!message.trim()) {
      setStatusFeedback({ type: 'error', text: 'Email body cannot be empty.' });
      return;
    }
    if (/\{\{(?:student_name|case_reference)\}\}/.test(`${subject}\n${message}`)) {
      setStatusFeedback({ type: 'error', text: 'Replace the template placeholders with the correct details before sending.' });
      return;
    }
    setStatusFeedback(null);
    setShowConfirmModal(true);
  };

  const handleConfirmSend = async () => {
    if (isSending) return;
    setShowConfirmModal(false);
    setIsSending(true);
    setStatusFeedback(null);

    try {
      const res = await sendStudentEmail({
        to_name: toName,
        to_email: toEmail,
        subject,
        message,
        case_reference: caseRef
      });

      if (res.success) {
        try {
          recordAuditEvent('Email sent', 'EmailJS reported a successful send; recipient and message content are not stored in this activity entry.');
          setStatusFeedback({ type: 'success', text: 'Email was sent successfully through your connected email service. A local activity entry was recorded.' });
        } catch (error) {
          setStatusFeedback({
            type: 'error',
            text: `Email was sent successfully, but the local activity entry could not be saved: ${error instanceof Error ? error.message : 'browser storage is unavailable.'}`,
          });
        }
      } else {
        setStatusFeedback({ type: 'error', text: res.message });
      }
    } catch (error) {
      setStatusFeedback({
        type: 'error',
        text: error instanceof Error ? error.message : 'Email delivery failed. Please try again.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 text-[#202923]">
      {/* Confirmation Dialog */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E3E7E0] max-w-md w-full shadow-xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-[#202923] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#174C3C]" /> Confirm Outgoing Dispatch
            </h3>
            <p className="text-xs text-[#707A72] mt-2 leading-relaxed">
              Confirm sending this message to <strong className="text-[#202923]">{toEmail}</strong>. Recipient details and message content will be sent to EmailJS and its configured email provider.               Sender identity and institutional delivery are not verified here.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707A72] hover:bg-[#F7F6F0] border border-[#E3E7E0] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                disabled={isSending}
                className="px-5 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                {isSending ? 'Sending...' : 'Confirm and send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202923]">Email Center</h1>
          <p className="text-xs text-[#707A72] mt-1">
            Communicate with students about submissions, reviews, and academic integrity cases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 rounded-xl bg-white border border-[#E3E7E0] hover:bg-[#F7F6F0] text-xs font-semibold text-[#202923] flex items-center gap-2 transition-all shadow-xs"
          >
            <Eye size={14} className="text-[#174C3C]" />
            {isPreviewMode ? 'Edit Mode' : 'Live Preview'}
          </button>
          <button
            onClick={handleInitiateSend}
            disabled={isSending}
            className="px-5 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs disabled:opacity-50"
          >
            <Send size={14} />
            {isSending ? 'Dispatching...' : 'Send Email'}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-[#F6E0B5] bg-[#FFF9EC] p-3 text-xs leading-5 text-[#684713]">
        <ToggleSwitch
          checked={authorizedToSend}
          onChange={setAuthorizedToSend}
          label="Authorize sharing recipient details and message with EmailJS"
          className="mt-0.5"
        />
        <span>I am authorized to share these recipient details and message with EmailJS and its configured email provider, and have followed the applicable notice and consent process.</span>
      </label>

      {/* Config Notice if EmailJS env missing */}
      {!configured && (
        <div className="p-4 rounded-xl bg-[#FFF1D6] border border-[#F6E0B5] flex items-start gap-3 text-xs text-[#7C5315]">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Email delivery setup required:</strong> Add your credentials (<code>EMAILJS_SERVICE_ID</code>, <code>EMAILJS_TEMPLATE_ID</code>, <code>EMAILJS_PUBLIC_KEY</code>) to your environment variables to enable delivery. Form validation and message previews are available.
          </div>
        </div>
      )}

      {/* Status Feedback Banner */}
      {statusFeedback && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
          statusFeedback.type === 'success'
            ? 'bg-[#E4F1E9] border-[#C3E4CF] text-[#10382D]'
            : 'bg-[#FBE8E6] border-[#F5C7C3] text-[#A82A2A]'
        }`}>
          {statusFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusFeedback.text}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Template Selector Panel */}
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider block mb-1">
              Select Preset Template
            </span>
            <p className="text-xs text-[#707A72]">
              Choose from standardized institutional communication rubrics.
            </p>
          </div>

          <div className="space-y-1.5">
            {templates.map(tmpl => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#E4F1E9] text-[#10382D] font-semibold border border-[#C3E4CF]'
                      : 'text-[#202923] hover:bg-[#F7F6F0] border border-transparent'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  {isSelected && <CheckCircle2 size={14} className="text-[#174C3C]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E3E7E0] space-y-2">
            <span className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider block">
              Case Metadata Ref
            </span>
            <input
              type="text"
              className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-3 py-2 text-xs text-[#202923] outline-none focus:border-[#174C3C]"
              placeholder="Enter an assignment or case reference"
              value={caseRef}
              onChange={e => setCaseRef(e.target.value)}
            />
          </div>

          <button
            onClick={handleClearForm}
            className="w-full py-2 rounded-xl border border-[#E3E7E0] text-xs font-semibold text-[#707A72] hover:bg-[#F7F6F0] flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} /> Clear Form
          </button>
        </div>

        {/* Composition / Preview Panel */}
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          {!isPreviewMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#707A72] uppercase tracking-wider block mb-1">
                    Recipient Student Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-3.5 py-2.5 text-xs text-[#202923] outline-none focus:border-[#174C3C]"
                    value={toName}
                    onChange={e => setToName(e.target.value)}
                    placeholder="Student Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#707A72] uppercase tracking-wider block mb-1">
                    Recipient Email Address
                  </label>
                  <input
                    id="recipient-email"
                    name="to_email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-3.5 py-2.5 text-xs text-[#202923] outline-none focus:border-[#174C3C]"
                    value={toEmail}
                    onChange={e => setToEmail(e.target.value)}
                    placeholder="student@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#707A72] uppercase tracking-wider block mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-3.5 py-2.5 text-xs text-[#202923] outline-none focus:border-[#174C3C]"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Official Notice Subject"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#707A72] uppercase tracking-wider block mb-1 flex items-center justify-between">
                  <span>Message Body</span>
                  <span className="text-[11px] text-[#707A72] font-normal">Editable rich draft</span>
                </label>
                <textarea
                  className="w-full h-80 bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-4 text-xs text-[#202923] leading-relaxed resize-none outline-none focus:border-[#174C3C] font-sans"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Compose notice content..."
                />
              </div>
            </div>
          ) : (
            /* Live Email Client Preview */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0] text-xs space-y-1.5">
                <div><span className="text-[#707A72] font-semibold">From:</span> Configured EmailJS sender</div>
                <div><span className="text-[#707A72] font-semibold">To:</span> {toName || 'Student'} &lt;{toEmail || 'student@university.edu'}&gt;</div>
                <div><span className="text-[#707A72] font-semibold">Subject:</span> <strong>{subject || '(No subject)'}</strong></div>
              </div>

              <div className="p-6 rounded-xl border border-[#E3E7E0] bg-white min-h-[340px] text-xs leading-relaxed whitespace-pre-wrap font-sans text-[#202923]">
                {message || '(Empty message body)'}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#E3E7E0] flex items-center justify-between text-xs text-[#707A72]">
            <span>Delivery: <strong>Configured EmailJS service</strong></span>
            <span>Review the provider&apos;s handling and security terms.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
