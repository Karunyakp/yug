import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCurrentLocalAccount } from '../services/localAuth';
import { readAuditEvents, type AuditEvent } from '../services/localAuditLog';

export default function Profile() {
  const account = getCurrentLocalAccount();
  const [{ events, error }] = useState(() => {
    try {
      return { events: readAuditEvents(), error: '' };
    } catch (loadError) {
      return {
        events: [] as AuditEvent[],
        error: loadError instanceof Error ? loadError.message : 'Unable to read local activity.',
      };
    }
  });
  const initials = account?.name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase() ?? '';

  return (
    <div className="space-y-6 pb-12 text-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="mt-1 text-gray-400">Your account information and activity in this browser.</p>
        </div>
        <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-white/5">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {account ? (
        <section className="rounded-3xl border border-white/5 bg-[#1a1a24] p-6">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#174C3C] text-xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{account.name}</h2>
              <p className="mt-1 text-gray-300">{account.email}</p>
              <p className="mt-1 text-xs text-gray-400">Account created {new Date(account.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </section>
      ) : (
        <p className="rounded-2xl border border-white/5 bg-[#1a1a24] p-6 text-sm text-gray-400">
          No local account is currently signed in.
        </p>
      )}

      <section className="rounded-2xl border border-white/5 bg-[#1a1a24] p-6">
        <h2 className="font-semibold">Recent activity</h2>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>
        ) : events.length ? (
          <ol className="mt-4 divide-y divide-white/5">
            {events.slice(0, 10).map(event => (
              <li key={event.id} className="py-3">
                <p className="text-sm font-medium">{event.action}</p>
                <p className="mt-1 text-sm text-gray-400">{event.detail}</p>
                <time className="mt-1 block text-xs text-gray-500" dateTime={event.timestamp}>
                  {new Date(event.timestamp).toLocaleString()}
                </time>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-sm text-gray-400">No local activity has been recorded.</p>
        )}
      </section>
    </div>
  );
}
