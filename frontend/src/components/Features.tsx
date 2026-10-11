import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  Code2,
  Download,
  FileText,
  FolderKanban,
  Mail,
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
];

const workflowFeatures = [
  {
    icon: <ChartNoAxesCombined size={21} />,
    title: 'Overview dashboard',
    description: 'See a snapshot of review activity and a visual queue for cases that need attention.',
    link: '/dashboard',
    action: 'Dashboard',
  },
  {
    icon: <FolderKanban size={21} />,
    title: 'Submissions and assignments',
    description: 'Browse the demo submission list and assignment workspace, with assignment status and review context.',
    link: '/submissions',
    action: 'Submissions',
  },
  {
    icon: <Network size={21} />,
    title: 'Similarity network view',
    description: 'Explore a visual graph of example submissions and similarity links. The displayed records are sample data.',
    link: '/network',
    action: 'Network view',
  },
  {
    icon: <FileText size={21} />,
    title: 'Reports and exports',
    description: 'Export report rows as CSV, print a report to PDF, and export local account names and emails without password hashes.',
    link: '/reports',
    action: 'Reports',
  },
  {
    icon: <UsersRound size={21} />,
    title: 'Review staff and profile',
    description: 'Browse reviewer and profile screens designed to demonstrate a faculty review workspace.',
    link: '/users',
    action: 'Review staff',
  },
  {
    icon: <Settings2 size={21} />,
    title: 'Settings and preferences',
    description: 'Explore the demo settings for notifications, review thresholds, and workspace preferences.',
    link: '/settings',
    action: 'Settings',
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
    description: 'Ask the in-app assistant questions about the demo or general code-review concepts. Do not share confidential information.',
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
              Everything in one
              <span className="block text-[#174C3C]">human-led review workspace.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5E6961]">
              Compare code, organize review work, create exports, and use optional AI assistance. This page describes what is available in the current CodeGuard AI frontend demo.
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
            ['Browser-based demo', 'Accounts and some settings stay in this browser. There is no application backend.'],
            ['Connected services', 'Gemini and EmailJS features require their respective public frontend configuration.'],
            ['Sample records', 'Several dashboard, report, and network screens use illustrative demo data.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-[#174C3C]"><Check size={17} /><h2 className="text-sm font-semibold text-[#202923]">{title}</h2></div>
              <p className="text-sm leading-6 text-[#707A72]">{description}</p>
            </div>
          ))}
        </div>

        <FeatureGroup
          title="Code review and analysis"
          description="Tools to inspect code similarity signals while keeping human judgment at the center."
          features={reviewFeatures}
        />
        <FeatureGroup
          title="Academic review workflow"
          description="Explore the app’s connected screens for organizing submissions, assignments, evidence, and staff."
          features={workflowFeatures}
        />
        <FeatureGroup
          title="Communication and assistance"
          description="Optional integrations extend the browser demo. Their requests are sent from the browser to the configured provider."
          features={connectedFeatures}
        />

        <section className="mt-14 rounded-3xl border border-[#E3E7E0] bg-white p-6 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#174C3C]">Transparent by design</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">A demo, not a production security system.</h2>
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
          <p>© 2026 CodeGuard AI · Frontend demonstration</p>
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
