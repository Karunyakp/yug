import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  CircleHelp,
  Code2,
  Download,
  Eye,
  FileText,
  Filter,
  FolderKanban,
  KeyRound,
  Mail,
  MessageCircle,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const reviewFeatures = [
  {
    icon: <Code2 size={21} />,
    title: 'Code comparison workspace',
    description: 'Compare two code samples with local similarity heuristics and review the evidence and metrics in one place.',
    link: '/compare',
    action: 'Explore code analysis',
  },
  {
    icon: <BrainCircuit size={21} />,
    title: 'Optional AI analysis',
    description: 'Request Gemini-generated explanations and observations alongside the local comparison. AI output is advisory and can be wrong.',
    link: '/compare',
    action: 'See comparison tools',
  },
  {
    icon: <Sparkles size={21} />,
    title: 'Clear local fallback',
    description: 'If the AI service is unavailable, the comparison page labels its local heuristic findings instead of presenting them as AI results.',
    link: '/compare',
    action: 'How comparison works',
  },
  {
    icon: <ShieldCheck size={21} />,
    title: 'Human-led decisions',
    description: 'Similarity indicators are not proof of misconduct. Review context and follow your institution’s process before making decisions.',
    link: '/terms',
    action: 'Read responsible-use terms',
  },
  {
    icon: <MessageCircle size={21} />,
    title: 'Explain Your Code questions',
    description: 'Generate neutral, code-grounded discussion questions with optional Gemini consent. Questions are not timed or scored, and responses do not prove authorship.',
    link: '/compare',
    action: 'Explore the question generator',
  },
  {
    icon: <Eye size={21} />,
    title: 'Explainable paired-line evidence',
    description: 'Inspect exact normalized line matches with line references. It is a simple text comparison, not AST analysis or proof of copying.',
    link: '/compare',
    action: 'Inspect evidence',
  },
  {
    icon: <ShieldCheck size={21} />,
    title: 'Common-algorithm context',
    description: 'A lightweight bubble-sort pattern heuristic can add context without changing the overlap percentage or claiming independent authorship.',
    link: '/compare',
    action: 'Review context labels',
  },
  {
    icon: <MessageCircle size={21} />,
    title: 'Student evidence and response view',
    description: 'Prepare a same-browser view of the compared samples and measurements; a student can save a response locally. It does not deliver a formal appeal.',
    link: '/student-response',
    action: 'Open student response',
  },
];

const workflowFeatures = [
  {
    icon: <ChartNoAxesCombined size={21} />,
    title: 'Overview dashboard',
    description: 'Open the dashboard. Comparison history is not stored in this browser.',
    link: '/dashboard',
    action: 'Dashboard',
  },
  {
    icon: <FolderKanban size={21} />,
    title: 'Submissions and assignments',
    description: 'Open the submission and assignment workspaces. These records are not stored in this browser.',
    link: '/submissions',
    action: 'Submissions',
  },
  {
    icon: <Filter size={21} />,
    title: 'Submission workspace',
    description: 'Review submission records when they are available.',
    link: '/submissions',
    action: 'Try submission tools',
  },
  {
    icon: <Network size={21} />,
    title: 'Similarity network view',
    description: 'View submission relationships when comparison records are available.',
    link: '/network',
    action: 'Network view',
  },
  {
    icon: <FileText size={21} />,
    title: 'Reports and exports',
    description: 'Export account names and email addresses stored in this browser. Report data appears when records are available.',
    link: '/reports',
    action: 'Reports',
  },
  {
    icon: <UsersRound size={21} />,
    title: 'Review staff and profile',
    description: 'View accounts created in this browser and the current account profile.',
    link: '/users',
    action: 'Review staff',
  },
  {
    icon: <Settings2 size={21} />,
    title: 'Settings and preferences',
    description: 'Review the editable, browser-local activity log. It is not a secure or tamper-proof institutional audit trail.',
    link: '/settings',
    action: 'Settings and activity log',
  },
  {
    icon: <KeyRound size={21} />,
    title: 'Browser-local accounts',
    description: 'Create an account and sign in in the same browser. Accounts do not sync across devices.',
    link: '/signup',
    action: 'Create an account',
  },
];

const connectedFeatures = [
  {
    icon: <Mail size={21} />,
    title: 'Email Center',
    description: 'Compose and send review-related messages through EmailJS when the frontend email configuration is set up.',
    link: '/email-center',
    action: 'Email Center',
  },
  {
    icon: <Bot size={21} />,
    title: 'AI help assistant',
    description: 'Ask about CodeGuard or code-review concepts. Chat text and prior messages are sent to Google Gemini only after you check the consent box.',
    link: '/privacy',
    action: 'Privacy details',
  },
];

function FeatureCard({
  icon,
  title,
  description,
  link,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  action: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#E3E7E0] bg-white p-5 shadow-[0_10px_30px_-26px_rgba(32,41,35,0.35)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]">{icon}</div>
      <h3 className="text-base font-semibold text-[#202923]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[#707A72]">{description}</p>
      <Link to={link} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#174C3C] hover:text-[#10382D]">
        {action} <ArrowRight size={15} />
      </Link>
    </article>
  );
}

function FeatureGroup({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: typeof reviewFeatures;
}) {
  return (
    <section className="mt-14">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-[#202923]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#707A72]">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-8 text-[#202923] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#707A72] hover:text-[#174C3C]">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/privacy" className="font-medium text-[#707A72] hover:text-[#174C3C]">Privacy</Link>
            <Link to="/terms" className="font-medium text-[#707A72] hover:text-[#174C3C]">Terms</Link>
            <Link to="/login" className="font-semibold text-[#174C3C] hover:text-[#10382D]">Sign in</Link>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#C3E4CF] bg-gradient-to-br from-white via-[#F1F7F1] to-[#E4F1E9] p-7 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C3E4CF] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#174C3C]">
              <Sparkles size={14} /> CodeGuard AI feature guide
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Fair review starts
              <span className="block text-[#174C3C]">with context, not a score.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5E6961]">
              An academic code-review workspace designed to keep evidence, student context, and human judgment in the loop.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382D]">
                Get started <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-[#D9DED8] bg-white px-5 py-3 text-sm font-semibold text-[#354139] transition hover:border-[#174C3C]">
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Connected services', 'Gemini and EmailJS features require their respective public frontend configuration.'],
            ['Workspace data', 'Workspace views do not include prefilled records. They show account information and results only when available.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-[#174C3C]"><Check size={17} /><h2 className="text-sm font-semibold text-[#202923]">{title}</h2></div>
              <p className="text-sm leading-6 text-[#707A72]">{description}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 overflow-hidden rounded-3xl bg-[#174C3C] text-white">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-7 sm:p-9 lg:p-11">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C3E4CF]">The CodeGuard difference</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                More context.
                <span className="block text-[#C3E4CF]">Less guesswork.</span>
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/75">
                Similarity is a prompt for review, never an automated verdict. Results use local text-based heuristics and decisions stay with people.
              </p>
              <Link to="/compare" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#174C3C] transition hover:bg-[#E4F1E9]">
                See the comparison workspace <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-3">
              {[
                { icon: <Eye size={20} />, title: 'Evidence first', detail: 'Inspect the code and local metrics before forming a view.' },
                { icon: <BrainCircuit size={20} />, title: 'AI with boundaries', detail: 'Optional AI observations stay advisory and can fail visibly.' },
                { icon: <ShieldCheck size={20} />, title: 'People decide', detail: 'No similarity score should make an academic decision alone.' },
              ].map(item => (
                <div key={item.title} className="flex flex-col justify-center bg-[#174C3C] p-6 sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C3E4CF]">{item.icon}</div>
                  <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGroup
          title="Code review and analysis"
          description="Tools to inspect code similarity signals while keeping human judgment at the center."
          features={reviewFeatures}
        />
        <FeatureGroup
          title="Academic review workflow"
          description="Navigate the workspace for submissions, assignments, reports, and account management."
          features={workflowFeatures}
        />
        <FeatureGroup
          title="Communication and assistance"
          description="Optional integrations send requests from your browser to their configured provider."
          features={connectedFeatures}
        />

        <section className="mt-14">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#174C3C]">A quick product tour</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#202923]">From code sample to considered review.</h2>
            <p className="mt-2 text-sm leading-6 text-[#707A72]">A focused workflow from code comparison to review.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              { step: '01', title: 'Open Compare', body: 'Enter code you are authorized to review.', href: '/compare', icon: <Code2 size={19} /> },
              { step: '02', title: 'Run analysis', body: 'View local similarity indicators and optional AI observations when configured.', href: '/compare', icon: <BrainCircuit size={19} /> },
              { step: '03', title: 'Review context', body: 'Treat results as prompts for careful investigation, not as proof or a decision.', href: '/terms', icon: <CircleHelp size={19} /> },
              { step: '04', title: 'Export results', body: 'Print comparison results or export account information.', href: '/reports', icon: <Download size={19} /> },
            ].map(item => (
              <Link key={item.step} to={item.href} className="group rounded-2xl border border-[#E3E7E0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#B8D4C0] hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.16em] text-[#9AA49C]">{item.step}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]">{item.icon}</span>
                </div>
                <h3 className="mt-5 font-semibold text-[#202923]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#707A72]">{item.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#174C3C]">
                  Open <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-[#E3E7E0] bg-white p-6 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#174C3C]">Transparent by design</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Designed for transparent, responsible review.</h2>
              <p className="mt-3 text-sm leading-6 text-[#707A72]">
                Local accounts are browser-specific. AI requests can include the code or chat text you submit. Similarity signals can be inaccurate and must not be treated as proof or as an automated decision.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-[#F7F6F0] p-5">
              <Link to="/privacy" className="flex items-center justify-between rounded-xl border border-[#E3E7E0] bg-white px-4 py-3 text-sm font-semibold text-[#174C3C] hover:border-[#174C3C]">
                How data is handled <ArrowRight size={16} />
              </Link>
              <Link to="/terms" className="flex items-center justify-between rounded-xl border border-[#E3E7E0] bg-white px-4 py-3 text-sm font-semibold text-[#174C3C] hover:border-[#174C3C]">
                Responsible-use terms <ArrowRight size={16} />
              </Link>
              <Link to="/reports" className="flex items-center justify-between rounded-xl border border-[#E3E7E0] bg-white px-4 py-3 text-sm font-semibold text-[#174C3C] hover:border-[#174C3C]">
                Export options <Download size={16} />
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#DDE3DB] py-6 text-xs text-[#707A72]">
          <p>© 2026 CodeGuard AI · Academic code review</p>
          <nav aria-label="Legal and product pages" className="flex gap-4">
            <Link to="/" className="hover:text-[#174C3C]">Home</Link>
            <Link to="/privacy" className="hover:text-[#174C3C]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#174C3C]">Terms and Conditions</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
