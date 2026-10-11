import { Mail, Users } from 'lucide-react';
import { getLocalAccountsForExport } from '../services/localAuth';

export default function UsersPage() {
  const accounts = getLocalAccountsForExport();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="mt-1 text-gray-400">Accounts created in this browser.</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#1a1a24] p-5">
        <div className="flex items-center gap-3 text-gray-400">
          <Users className="h-5 w-5 text-pink-400" />
          <span className="text-sm uppercase tracking-wider">Local accounts</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-white">{accounts.length}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a24]">
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="font-semibold text-white">Account Directory</h2>
        </div>
        {accounts.length ? (
          <ul className="divide-y divide-white/5">
            {accounts.map(account => (
              <li key={account.email} className="flex flex-col justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center">
                <span className="font-medium text-white">{account.name}</span>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="h-4 w-4" />
                  {account.email}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-gray-400">No accounts have been created in this browser.</p>
        )}
      </div>
    </div>
  );
}
