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
    subject: 'Friendly Reminder: CS-204 Assignment Submission Deadline Approaching',
    body: `Dear {{student_name}},

This is a gentle reminder that the submission window for the upcoming assignment closes in 48 hours.

Please make sure you have submitted your verified source code via the institutional portal. Late submissions will incur standard department grade deductions.

If you have any questions or are encountering technical issues, please reach out during office hours.

Warm regards,
Prof. Verma
Department of Computer Science`
  },
  {
    id: 'submission_received',
    name: '2. Submission Received',
    subject: 'Receipt of Submission: CS-204 Code Assignment',
    body: `Dear {{student_name}},

We have successfully received your source code files for the CS-204 assignment.

Your submission has been queued for automated syntax verification and structural analysis. If any review inquiries arise, you will be notified via this email address.

Best regards,
CodeGuard Academic Integrity Review Team`
  },
  {
    id: 'academic_review',
    name: '3. Academic Review Notification',
    subject: 'Academic Integrity Review: Discussion Required for {{case_reference}}',
    body: `Dear {{student_name}},

I hope you are having a productive week.

During our routine academic integrity review of {{case_reference}}, our automated system flagged significant structural overlap between your submission and another student's work.

We believe strongly in providing students with an opportunity to explain their thought process. Please book a brief 15-minute slot during my office hours this Wednesday or Thursday so we can review the code logic together.

Sincerely,
Prof. Verma
Department of Computer Science`
  },
  {
    id: 'request_info',
    name: '4. Request for Additional Information',
    subject: 'Inquiry Regarding Implementation Strategy on {{case_reference}}',
    body: `Dear {{student_name}},

During code review of your recent assignment, certain algorithmic choices and external library dependencies were noted.

Could you please provide:
1. A brief explanation of the loop invariant reasoning on lines 10-18.
2. Any external documentation or authorized resources consulted during development.

Please reply to this email within 3 business days.

Best regards,
Prof. Verma`
  },
  {
    id: 'review_outcome',
    name: '5. Review Outcome',
    subject: 'Conclusion of Academic Review: {{case_reference}}',
    body: `Dear {{student_name}},

Thank you for meeting with me to discuss your submission for {{case_reference}}.

Following our conversation and examination of your development notes, the department review committee has concluded the review and updated your case status accordingly.

Your grade has been cleared for posting in the student portal.

Best regards,
Prof. Verma`
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
  const [toEmail, setToEmail] = useState(import.meta.env.VITE_EMAILJS_DEFAULT_RECIPIENT || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [caseRef, setCaseRef] = useState('');
  
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
      .replace(/{{student_name}}/g, toName || 'Student')
      .replace(/{{case_reference}}/g, caseRef || 'Assignment');

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
        setStatusFeedback({ type: 'success', text: 'Email was sent successfully through your connected email service.' });
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
              Are you sure you want to send this email to <strong className="text-[#202923]">{toEmail}</strong>? This action will deliver the official notice from your department identity.
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
                {isSending ? 'Dispatching...' : 'Yes, Dispatch Email'}
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

      {/* Config Notice if EmailJS env missing */}
      {!configured && (
        <div className="p-4 rounded-xl bg-[#FFF1D6] border border-[#F6E0B5] flex items-start gap-3 text-xs text-[#7C5315]">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>EmailJS Provider Ready:</strong> Add your credentials (<code>VITE_EMAILJS_SERVICE_ID</code>, <code>VITE_EMAILJS_TEMPLATE_ID</code>, <code>VITE_EMAILJS_PUBLIC_KEY</code>) to your environment variables to enable live delivery to student inboxes. Form validation and live previews are fully active.
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
              placeholder="e.g. CS-204 (#CASE-842)"
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
                <div><span className="text-[#707A72] font-semibold">From:</span> Prof. Verma &lt;verma@department.edu&gt;</div>
                <div><span className="text-[#707A72] font-semibold">To:</span> {toName || 'Student'} &lt;{toEmail || 'student@university.edu'}&gt;</div>
                <div><span className="text-[#707A72] font-semibold">Subject:</span> <strong>{subject || '(No subject)'}</strong></div>
              </div>

              <div className="p-6 rounded-xl border border-[#E3E7E0] bg-white min-h-[340px] text-xs leading-relaxed whitespace-pre-wrap font-sans text-[#202923]">
                {message || '(Empty message body)'}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#E3E7E0] flex items-center justify-between text-xs text-[#707A72]">
            <span>Sender: <strong>Prof. Verma (Academic Integrity Office)</strong></span>
            <span>Security: <strong>TLS Encrypted Academic Dispatch</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
