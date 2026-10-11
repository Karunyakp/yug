import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY || '';
const RECIPIENT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SendEmailPayload {
  to_name: string;
  to_email: string;
  subject: string;
  message: string;
  case_reference?: string;
  instructor_name?: string;
}

export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'text' in error && typeof error.text === 'string') {
    return error.text;
  }
  return 'Failed to dispatch email via EmailJS provider.';
}

export async function sendStudentEmail(payload: SendEmailPayload): Promise<{ success: boolean; message: string }> {
  if (!isEmailJSConfigured()) {
    return {
      success: false,
      message: 'EmailJS is not yet configured in environment variables (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY). Please add them to your .env or Vercel settings.'
    };
  }

  const toEmail = payload.to_email.trim();
  const subject = payload.subject.trim();
  const message = payload.message.trim();

  if (!RECIPIENT_EMAIL_PATTERN.test(toEmail)) {
    return { success: false, message: 'Please enter a valid recipient email address.' };
  }
  if (!subject || !message) {
    return { success: false, message: 'Email subject and message are required.' };
  }

  try {
    const res = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name: payload.to_name.trim(),
        to_email: toEmail,
        subject,
        message,
        case_reference: payload.case_reference?.trim() || '',
        instructor_name: payload.instructor_name?.trim() || ''
      },
      {
        publicKey: PUBLIC_KEY,
        limitRate: {
          id: 'codeguard-email',
          throttle: 1000
        }
      }
    );
    if (res.status === 200) {
      return { success: true, message: 'Email dispatched successfully via EmailJS.' };
    }
    return { success: false, message: `EmailJS responded with status: ${res.status} (${res.text})` };
  } catch (error: unknown) {
    console.error('EmailJS sending failed:', error);
    return { success: false, message: getErrorMessage(error) };
  }
}
