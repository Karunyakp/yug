import { Download } from 'lucide-react';
import { getLocalAccountsForExport } from '../services/localAuth';
import { workspaceReports } from '../services/workspaceRecords';

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

function exportReports(): void {
  const rows = [
    ['Report', 'Course', 'Submissions', 'Overlap', 'Status', 'Created at'],
    ...workspaceReports.map(report => [
      report.title,
      report.course,
      String(report.submissions),
      `${report.overlap}%`,
      report.status,
      report.createdAt,
    ]),
  ];
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'codeguard-reports.csv';
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
          <p className="mt-1 text-sm text-[#707A72]">Review comparison summaries across your courses.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportReports} className="inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#10382D]">
            <Download size={14} /> Export reports
          </button>
          <button type="button" onClick={exportAccounts} disabled={accountCount === 0} className="inline-flex items-center gap-2 rounded-xl border border-[#E3E7E0] bg-white px-4 py-2.5 text-xs font-semibold text-[#174C3C] transition-colors hover:bg-[#F7F6F0] disabled:cursor-not-allowed disabled:opacity-50">
            <Download size={14} /> Export accounts ({accountCount})
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {workspaceReports.map(report => (
          <article key={report.id} className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#174C3C]">{report.id}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${report.status === 'Ready for review' ? 'bg-[#FFF3D9] text-[#8A641F]' : 'bg-[#E4F1E9] text-[#174C3C]'}`}>{report.status}</span>
            </div>
            <h2 className="mt-4 font-semibold">{report.title}</h2>
            <p className="mt-1 text-sm text-[#707A72]">{report.course} · {report.submissions} submissions</p>
            <div className="mt-5 flex items-end justify-between border-t border-[#E3E7E0] pt-4">
              <div><p className="text-xs text-[#707A72]">Highest overlap</p><p className="mt-1 text-2xl font-semibold">{report.overlap}%</p></div>
              <time className="text-xs text-[#8A938B]" dateTime={report.createdAt}>{new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
