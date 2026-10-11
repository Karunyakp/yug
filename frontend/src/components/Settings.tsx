import { useState } from 'react';
import { Bell, ShieldCheck, SlidersHorizontal, PlugZap, Sparkles, Trash2 } from 'lucide-react';
import { clearAuditEvents, readAuditEvents, type AuditEvent } from '../services/localAuditLog';

const settings = [
  {
    icon: <Bell className="w-5 h-5 text-pink-400" />,
    title: 'Notifications',
    description: 'Notification settings preview. The demo does not run a notification service.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: 'Security',
    description: 'Security settings preview. This frontend demo has no server-side access control or audit trail.',
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-cyan-400" />,
    title: 'Workspace Preferences',
    description: 'Preference controls are illustrative and do not alter analysis or dashboard behavior.',
  },
  {
    icon: <PlugZap className="w-5 h-5 text-violet-400" />,
    title: 'Integrations',
    description: 'Integration options are not connected in this frontend demonstration.',
  },
];

export default function Settings() {
  const [{ initialEvents, initialError }] = useState(() => {
    try {
      return { initialEvents: readAuditEvents(), initialError: '' };
    } catch (error) {
      return { initialEvents: [], initialError: error instanceof Error ? error.message : 'Unable to read local activity.' };
    }
  });
  const [events, setEvents] = useState<AuditEvent[]>(initialEvents);
  const [auditError, setAuditError] = useState(initialError);

  const refreshAudit = () => {
    try {
      setEvents(readAuditEvents());
      setAuditError('');
    } catch (error) {
      setAuditError(error instanceof Error ? error.message : 'Unable to read local activity.');
    }
  };

  const handleClearAudit = () => {
    try {
      clearAuditEvents();
      setEvents([]);
      setAuditError('');
    } catch (error) {
      setAuditError(error instanceof Error ? error.message : 'Unable to clear local activity.');
    }
  };

  return (
    <div className="legacy-dark-page space-y-6 pb-12">
      <div>
        <h1 className="text-white text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Tune the platform for your institute workflows and review policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {settings.map((item) => (
          <div key={item.title} className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#111118] p-2.5 rounded-xl border border-white/5">{item.icon}</div>
              <h2 className="text-white font-semibold">{item.title}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            <span className="mt-5 inline-block text-gray-500 text-sm font-medium">Demo preview · not connected</span>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-[#E3E7E0] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#202923]">Browser-local activity log</h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-[#707A72]">
              Records demo comparison runs, review state changes, bulk list actions, and successful email sends in this browser. It is editable, can be cleared, does not sync, and is not a secure or tamper-proof institutional audit trail.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={refreshAudit} className="rounded-lg border border-[#E3E7E0] px-3 py-2 text-xs font-semibold text-[#174C3C]">Refresh</button>
            <button type="button" onClick={handleClearAudit} className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C7C3] px-3 py-2 text-xs font-semibold text-[#A82A2A]"><Trash2 size={14} /> Clear log</button>
          </div>
        </div>
        {auditError && <p role="alert" className="mt-3 rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-xs text-[#A82A2A]">{auditError}</p>}
        {events.length ? (
          <ol className="mt-4 max-h-80 divide-y divide-[#E3E7E0] overflow-auto">
            {events.map(event => (
              <li key={event.id} className="py-3">
                <p className="text-xs font-semibold text-[#354139]">{event.action}</p>
                <p className="mt-1 text-xs text-[#707A72]">{event.detail}</p>
                <time className="mt-1 block text-[11px] text-[#8A938B]" dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString()}</time>
              </li>
            ))}
          </ol>
        ) : <p className="mt-4 text-xs text-[#707A72]">No local activity has been recorded in this browser.</p>}
      </section>

      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-pink-500/20 p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-pink-300" />
          </div>
          <h2 className="text-white font-semibold">Demo configuration preview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Policy controls</p>
            <p className="text-white text-lg font-bold mt-2">Not connected</p>
          </div>
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Institution integration</p>
            <p className="text-white text-lg font-bold mt-2">Not connected</p>
          </div>
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Live usage metrics</p>
            <p className="text-white text-lg font-bold mt-2">Unavailable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
