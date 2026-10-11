import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Code2, FileText, Mail, Plus, ShieldCheck } from 'lucide-react';
import { readAuditEvents, type AuditEvent } from '../services/localAuditLog';
import { getCurrentLocalAccount } from '../services/localAuth';

const quickLinks = [
  {
    title: 'Compare code',
    description: 'Run a local comparison and inspect matching lines.',
    href: '/compare',
    icon: <Code2 size={19} />,
  },
  {
    title: 'Review reports',
    description: 'Print comparison results or export account information.',
    href: '/reports',
    icon: <FileText size={19} />,
  },
  {
    title: 'Email Center',
    description: 'Prepare a review message for an authorized recipient.',
    href: '/email-center',
    icon: <Mail size={19} />,
  },
];

export default function Dashboard() {
  const account = getCurrentLocalAccount();
  const [{ events, error }] = useState(() => {
    try {
      return { events: readAuditEvents().slice(0, 5), error: '' };
    } catch (loadError) {
      return {
        events: [] as AuditEvent[],
        error: loadError instanceof Error ? loadError.message : 'Unable to load recent activity.',
      };
    }
  });

  return (
    <div className="space-y-6 pb-16 text-[#202923]">
      <section className="overflow-hidden rounded-3xl border border-[#DCE7DC] bg-gradient-to-br from-white via-white to-[#EAF3EC] p-6 shadow-[0_20px_50px_-40px_rgba(23,76,60,0.5)] sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#56806A]">Workspace overview</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#202923]">
              Welcome{account?.name ? `, ${account.name.split(/\s+/)[0]}` : ' back'}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#707A72]">
              Your review workspace is ready. Start a comparison or continue with one of the workspace tools.
            </p>
          </div>
          <Link
            to="/compare"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10382D]"
          >
            <Plus size={16} /> New comparison
          </Link>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#DCE7DC] pt-5 text-xs text-[#5E6961]">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#174C3C]" /> Human-led review</span>
          <span className="inline-flex items-center gap-2"><Activity size={15} className="text-[#174C3C]" /> Local analysis</span>
          <span>AI assistance is optional</span>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Workspace tools</h2>
            <p className="mt-1 text-sm text-[#707A72]">Start where you need to work.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map(item => (
            <Link
              key={item.title}
              to={item.href}
              className="group rounded-2xl border border-[#E3E7E0] bg-white p-5 shadow-[0_8px_24px_-22px_rgba(32,41,35,0.4)] transition hover:-translate-y-0.5 hover:border-[#B8D4C0] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]">{item.icon}</span>
                <ArrowRight size={16} className="text-[#9AA49C] transition group-hover:translate-x-1 group-hover:text-[#174C3C]" />
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-5 text-[#707A72]">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E3E7E0] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold">Recent activity</h2>
            <p className="mt-1 text-sm text-[#707A72]">Updates recorded in this browser.</p>
          </div>
          <Link to="/settings" className="text-sm font-semibold text-[#174C3C] hover:underline">View activity log</Link>
        </div>
        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-[#FBE8E6] p-3 text-sm text-[#A82A2A]">{error}</p>
        ) : events.length ? (
          <ol className="mt-4 divide-y divide-[#E3E7E0]">
            {events.map(event => (
              <li key={event.id} className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center">
                <span className="text-sm font-medium">{event.action}</span>
                <time className="text-xs text-[#8A938B]" dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString()}</time>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-4 rounded-xl bg-[#F7F8F5] px-4 py-5 text-sm text-[#707A72]">
            Activity from this browser will appear here.
          </div>
        )}
      </section>
    </div>
  );
}
