import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { clearAuditEvents, readAuditEvents, type AuditEvent } from '../services/localAuditLog';

export default function Settings() {
  const [{ initialEvents, initialError }] = useState(() => {
    try {
      return { initialEvents: readAuditEvents(), initialError: '' };
    } catch (error) {
      return {
        initialEvents: [] as AuditEvent[],
        initialError: error instanceof Error ? error.message : 'Unable to read local activity.',
      };
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
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-gray-400">Manage local activity stored in this browser.</p>
      </div>

      <section className="rounded-2xl border border-[#E3E7E0] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#202923]">Browser-local activity log</h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-[#707A72]">
              Activity is stored in this browser only. It does not sync and is not a secure or tamper-proof institutional audit trail.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={refreshAudit} className="rounded-lg border border-[#E3E7E0] px-3 py-2 text-xs font-semibold text-[#174C3C]">
              Refresh
            </button>
            <button type="button" onClick={handleClearAudit} className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C7C3] px-3 py-2 text-xs font-semibold text-[#A82A2A]">
              <Trash2 size={14} /> Clear log
            </button>
          </div>
        </div>
        {auditError && <p role="alert" className="mt-3 rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-xs text-[#A82A2A]">{auditError}</p>}
        {events.length ? (
          <ol className="mt-4 max-h-80 divide-y divide-[#E3E7E0] overflow-auto">
            {events.map(event => (
              <li key={event.id} className="py-3">
                <p className="text-xs font-semibold text-[#354139]">{event.action}</p>
                <p className="mt-1 text-xs text-[#707A72]">{event.detail}</p>
                <time className="mt-1 block text-[11px] text-[#8A938B]" dateTime={event.timestamp}>
                  {new Date(event.timestamp).toLocaleString()}
                </time>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-xs text-[#707A72]">No local activity has been recorded in this browser.</p>
        )}
      </section>
    </div>
  );
}
