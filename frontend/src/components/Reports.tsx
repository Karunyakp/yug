import { Download, FileText } from 'lucide-react';
import { getLocalAccountsForExport } from '../services/localAuth';

function csvCell(value: string): string {
  const safeText = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function exportAccounts(): void {
  const accounts = getLocalAccountsForExport();
  const rows = [
    ['Name', 'Email', 'Created at'],
    ...accounts.map(account => [account.name, account.email, account.createdAt]),
  ];
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'codeguard-local-accounts.csv';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const accountCount = getLocalAccountsForExport().length;

  return (
    <div className="space-y-6 pb-16 text-[#202923]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Review Notes</h1>
          <p className="mt-1 text-sm text-[#707A72]">Comparison reports are not stored in this browser.</p>
        </div>
        <button
          type="button"
          onClick={exportAccounts}
          disabled={accountCount === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E3E7E0] bg-white px-4 py-2.5 text-xs font-semibold text-[#174C3C] transition-colors hover:bg-[#F7F6F0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={14} /> Export local accounts ({accountCount})
        </button>
      </div>

      <div className="rounded-2xl border border-[#E3E7E0] bg-white p-8 text-center">
        <FileText className="mx-auto text-[#707A72]" size={28} />
        <h2 className="mt-3 text-lg font-semibold">No reports available</h2>
        <p className="mt-2 text-sm text-[#707A72]">
          There are no saved comparison records to report.
        </p>
      </div>
    </div>
  );
}
