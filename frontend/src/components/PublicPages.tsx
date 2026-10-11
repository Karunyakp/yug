import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'CodeGuard AI | Fair, evidence-led code review',
    description: 'A code review workspace for educators. Compare submissions, inspect evidence, and keep academic decisions human-led.',
  },
  '/login': {
    title: 'Sign in | CodeGuard AI',
    description: 'Sign in to your CodeGuard AI workspace.',
  },
  '/signup': {
    title: 'Create an account | CodeGuard AI',
    description: 'Create a browser-local account and use the CodeGuard AI review workspace.',
  },
  '/features': {
    title: 'Features | CodeGuard AI',
    description: 'Explore CodeGuard AI code comparison, review workflows, report exports, and optional AI assistance.',
  },
  '/student-response': {
    title: 'Student Evidence and Response | CodeGuard AI',
    description: 'Review comparison context and save a student response in this browser.',
  },
  '/privacy': {
    title: 'Privacy Policy | CodeGuard AI',
    description: 'Learn how CodeGuard AI stores information locally and uses connected services.',
  },
  '/terms': {
    title: 'Terms and Conditions | CodeGuard AI',
    description: 'Read the terms for using CodeGuard AI.',
  },
  '/not-found': {
    title: 'Page not found | CodeGuard AI',
    description: 'The page you requested could not be found.',
  },
};

export function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? {
      title: 'CodeGuard AI | Academic integrity workspace',
      description: 'Explore the CodeGuard AI academic code review workspace.',
    };
    document.title = metadata.title;

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = metadata.description;
  }, [pathname]);

  return null;
}

function PublicPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-8 text-[#202923] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#707A72] transition hover:text-[#174C3C]">
          <ArrowLeft size={16} /> CodeGuard AI
        </Link>
        <article className="mt-7 rounded-3xl border border-[#E3E7E0] bg-white p-6 shadow-[0_18px_60px_-36px_rgba(32,41,35,0.22)] sm:p-10 lg:p-14">
          {children}
          <div className="mt-10 flex flex-wrap gap-4 border-t border-[#E3E7E0] pt-6 text-sm">
            <Link to="/privacy" className="font-medium text-[#174C3C] hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="font-medium text-[#174C3C] hover:underline">Terms and Conditions</Link>
            <Link to="/signup" className="font-medium text-[#174C3C] hover:underline">Create an account</Link>
          </div>
        </article>
        <p className="mt-6 text-center text-xs leading-5 text-[#8A938B]">
          Account and activity data are stored in this browser. Do not store sensitive or confidential information here.
        </p>
      </div>
    </main>
  );
}

function PolicyHeading({ eyebrow, title, updated }: { eyebrow: string; title: string; updated: string }) {
  return (
    <header className="mb-9 border-b border-[#E3E7E0] pb-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174C3C]">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-[#707A72]">Last updated: {updated}</p>
    </header>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 space-y-3 text-sm leading-7 text-[#5E6961]">{children}</div>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <PublicPageFrame>
      <PolicyHeading eyebrow="Your information" title="Privacy Policy" updated="October 2026" />
      <p className="text-sm leading-7 text-[#5E6961]">
        This policy describes how CodeGuard AI handles information. Accounts and activity are stored in the browser; there is no server-side account database.
      </p>
      <PolicySection title="Information stored in your browser">
        <p>When you create an account, your name, email address, account creation date, and a password verifier are saved in this browser&apos;s local storage. Passwords are not stored as plain text, but this browser-only sign-in is not production-grade security. Anyone with access to this browser profile or its developer tools may access or alter local data.</p>
        <p>Signing out does not delete a locally saved account. Clearing this site&apos;s browser storage removes it. Local account data does not automatically sync to another browser or device.</p>
        <p>A comparison is processed in the current page and is not saved as a submission or report record. A browser-local activity log may record actions such as comparison runs and email sends. The log is editable and clearable and is not tamper-proof. Student response evidence and code are stored locally only when a reviewer explicitly prepares that same-browser view.</p>
      </PolicySection>
      <PolicySection title="When information is sent to third parties">
        <p><strong>Google Gemini:</strong> Code comparison runs locally by default. Only when you enable the explicit Gemini consent option and request analysis or question generation does the selected code or prompt go directly from your browser to Google&apos;s Gemini service using the configured public API key. Assistant messages are also sent to Gemini when you submit them. Review Google&apos;s applicable terms and privacy information first. Do not submit secrets, personal data, or confidential student work unless you have appropriate authorization and notice/consent.</p>
        <p><strong>EmailJS:</strong> When you confirm sending from Email Center, recipient details and message content are sent to EmailJS and its configured email provider. Confirm you are authorized to share the details and that the recipient has been appropriately informed. Transport and handling depend on provider configuration; CodeGuard makes no independent security or encryption guarantee.</p>
        <p><strong>Student response view:</strong> If a reviewer prepares the optional same-browser evidence view, both code samples and comparison context are saved in local storage so they can be inspected from that browser profile. A student response is also saved there. These items are not sent to faculty or synced to another device; anyone with access to the browser profile may be able to inspect or change them. Use your institution&apos;s official process for a formal response.</p>
        <p>Those providers process data under their own policies and terms. This application does not control their retention or processing.</p>
      </PolicySection>
      <PolicySection title="Exports and analytics">
        <p>Exports such as CSV files and print-to-PDF reports are generated in your browser and downloaded at your direction. You are responsible for protecting exported files after download. Export files are not sent to an application server.</p>
        <p>This policy makes no claim about hosting-provider logs, browser extensions, or network-level processing outside the app&apos;s control.</p>
      </PolicySection>
      <PolicySection title="Your choices and contact">
        <p>You can stop using the app and clear its site data through your browser settings. You can avoid third-party processing by not using AI or email features. No privacy contact or account deletion service is configured.</p>
      </PolicySection>
      <PolicySection title="Changes">
        <p>This policy may be updated as the service changes. The date above indicates the latest stated revision.</p>
      </PolicySection>
    </PublicPageFrame>
  );
}

export function TermsAndConditions() {
  return (
    <PublicPageFrame>
      <PolicyHeading eyebrow="Using CodeGuard" title="Terms and Conditions" updated="October 2026" />
      <p className="text-sm leading-7 text-[#5E6961]">
        By accessing CodeGuard AI, you agree to use the service responsibly. If you do not agree, do not use it.
      </p>
      <PolicySection title="Accounts and data">
        <p>Accounts are stored in browser storage, not verified by a server, and are not suitable for production identity, access control, or confidential record keeping. Do not rely on the service for backups, availability, or preservation of data.</p>
      </PolicySection>
      <PolicySection title="Responsible academic use">
        <p>Similarity scores and AI-generated explanations are limited, may be incorrect, and are not proof of plagiarism, misconduct, or AI authorship. There is no calibrated assignment baseline to estimate the chance that overlap occurred independently. Similarity can reflect shared starter code, common solutions, teaching materials, or false positives. A qualified human reviewer must independently examine relevant evidence, provide a meaningful opportunity to respond, and follow applicable institutional procedures before reaching a conclusion.</p>
        <p>You are responsible for having the rights and authorization to submit any code or personal information to an external AI or email provider. Do not upload material that you are not permitted to share.</p>
      </PolicySection>
      <PolicySection title="Acceptable use">
        <p>Do not use the app to harass, threaten, discriminate against, or make automated high-impact decisions about another person. Do not attempt to disrupt the app or misuse connected services. You are responsible for complying with your institution&apos;s rules, applicable laws, and third-party service terms.</p>
      </PolicySection>
      <PolicySection title="Third-party services">
        <p>AI and email features depend on Google Gemini and EmailJS, respectively. Their availability, outputs, and handling of information are governed by their own terms. The app may be unable to provide these features when a service, network, or public frontend API key is unavailable or restricted.</p>
      </PolicySection>
      <PolicySection title="No warranties or professional advice">
        <p>The service is provided “as is” and may contain errors or interruptions. To the extent allowed by law, no warranties are made about accuracy, availability, security, or fitness for a particular purpose. The app is not legal, educational, or security advice.</p>
      </PolicySection>
      <PolicySection title="Limitation and changes">
        <p>To the extent permitted by law, the creators are not liable for decisions made solely from the app&apos;s output, loss of locally stored data, or third-party service behavior. These terms may be revised as the service changes; continued use after an update constitutes acceptance of the revised terms.</p>
        <p>This template is informational and should be reviewed by qualified counsel before use as a binding policy or production service.</p>
      </PolicySection>
    </PublicPageFrame>
  );
}

export function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F6F0] px-5 py-12 text-[#202923]">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4F1E9] text-[#174C3C]">
          <ShieldCheck size={27} />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[#174C3C]">404 · Page not found</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page isn&apos;t here.</h1>
        <p className="mt-4 text-sm leading-6 text-[#707A72]">The address may be incorrect, or the page may have moved.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382D]">
          Back to home <ArrowRight size={17} />
        </Link>
        <div className="mt-6 flex justify-center gap-4 text-sm text-[#707A72]">
          <Link to="/login" className="hover:text-[#174C3C]">Sign in</Link>
          <Link to="/privacy" className="hover:text-[#174C3C]">Privacy</Link>
        </div>
      </div>
    </main>
  );
}
