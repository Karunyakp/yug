import { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LineEvidence } from '../services/analysisEngine';
import { recordAuditEvent } from '../services/localAuditLog';
import { PolicyLink } from './PublicPages';

const REVIEW_SHARE_KEY = 'codeguard:student-review-share';
const RESPONSES_KEY = 'codeguard:student-review-responses';

interface SharedReview {
  assignment: string;
  similarity: number;
  lexicalSimilarity: number;
  structuralSimilarity: number;
  commonAlgorithm: string | null;
  lineEvidence: LineEvidence[];
  submittedAt: string;
  source: string;
  code1: string;
  code2: string;
}

function readSharedReview(): SharedReview | null {
  const raw = localStorage.getItem(REVIEW_SHARE_KEY);
  if (!raw) return null;
  const value: unknown = JSON.parse(raw);
  if (typeof value !== 'object' || value === null) {
    throw new Error('The prepared review information is not valid. Return to Compare and prepare it again.');
  }
  const review = value as Record<string, unknown>;
  if (
    typeof review.assignment !== 'string' ||
    typeof review.similarity !== 'number' ||
    typeof review.lexicalSimilarity !== 'number' ||
    typeof review.structuralSimilarity !== 'number' ||
    typeof review.submittedAt !== 'string' ||
    typeof review.source !== 'string' ||
    typeof review.code1 !== 'string' ||
    typeof review.code2 !== 'string' ||
    !(review.commonAlgorithm === null || typeof review.commonAlgorithm === 'string') ||
    !Array.isArray(review.lineEvidence) ||
    !Number.isFinite(review.similarity) ||
    !Number.isFinite(review.lexicalSimilarity) ||
    !Number.isFinite(review.structuralSimilarity) ||
    review.similarity < 0 ||
    review.similarity > 100 ||
    review.lexicalSimilarity < 0 ||
    review.lexicalSimilarity > 100 ||
    review.structuralSimilarity < 0 ||
    review.structuralSimilarity > 100 ||
    Number.isNaN(Date.parse(review.submittedAt))
  ) {
    throw new Error('The prepared review information is incomplete. Return to Compare and prepare it again.');
  }
  if (review.source === 'CodeGuard AI frontend demo' || review.assignment === 'Sorting assignment (demo)') {
    throw new Error('This saved comparison used prefilled code and cannot be shown. Prepare a new comparison using your own code.');
  }
  return {
    assignment: review.assignment,
    similarity: review.similarity,
    lexicalSimilarity: review.lexicalSimilarity,
    structuralSimilarity: review.structuralSimilarity,
    submittedAt: review.submittedAt,
    source: review.source,
    code1: review.code1,
    code2: review.code2,
    commonAlgorithm: review.commonAlgorithm as string | null,
    lineEvidence: review.lineEvidence.filter((item): item is LineEvidence =>
      typeof item === 'object' && item !== null &&
      typeof item.firstLine === 'number' &&
      typeof item.secondLine === 'number' &&
      typeof item.excerpt === 'string'
    ),
  };
}

export default function StudentResponse() {
  const [{ review, reviewError }] = useState(() => {
    try {
      return { review: readSharedReview(), reviewError: '' };
    } catch (loadError) {
      return {
        review: null,
        reviewError: loadError instanceof Error
          ? loadError.message
          : 'Unable to read the prepared review information in this browser.',
      };
    }
  });
  const [response, setResponse] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [auditWarning, setAuditWarning] = useState('');

  const handleSaveResponse = () => {
    const text = response.trim();
    if (!text) {
      setError('Write a response before saving.');
      return;
    }
    try {
      const previous = localStorage.getItem(RESPONSES_KEY);
      const parsed: unknown = previous ? JSON.parse(previous) : [];
      if (!Array.isArray(parsed)) {
        throw new Error('Saved response data is invalid. Clear this site’s browser storage and try again.');
      }
      const responses = [...parsed, {
        reviewAssignment: review?.assignment ?? '',
        response: text,
        savedAt: new Date().toISOString(),
      }];
      localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
      setSaved(true);
      setError('');
      try {
        recordAuditEvent('Student response saved', 'Saved a student response in this browser; response content is not copied to the activity log.');
        setAuditWarning('');
      } catch (auditError) {
        setAuditWarning(auditError instanceof Error ? auditError.message : 'The response was saved, but its activity entry could not be recorded.');
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save your response in this browser.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F6F0] px-5 py-8 text-[#202923] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#707A72] hover:text-[#174C3C]">
          <ArrowLeft size={16} /> CodeGuard AI
        </Link>

        <section className="mt-7 rounded-3xl border border-[#E3E7E0] bg-white p-6 shadow-[0_18px_60px_-36px_rgba(32,41,35,0.22)] sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]"><ShieldCheck size={23} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#174C3C]">Student response</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">Review the evidence and share your perspective</h1>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#F6E0B5] bg-[#FFF9EC] p-4 text-sm leading-6 text-[#684713]">
            A similarity indicator is not a finding of misconduct. Common assignment requirements, examples, and starter code can lead to overlap. You may explain your approach, identify shared course materials, or note context for an instructor to consider.
          </div>

          {reviewError ? (
            <p role="alert" className="mt-6 rounded-xl border border-[#F5C7C3] bg-[#FBE8E6] p-4 text-sm leading-6 text-[#A82A2A]">
              {reviewError}
            </p>
          ) : review ? (
            <section className="mt-6 rounded-2xl border border-[#E3E7E0] bg-[#F7F6F0] p-5">
              <h2 className="text-sm font-semibold">Prepared comparison context</h2>
              <p className="mt-1 text-xs text-[#707A72]">
                {review.assignment && <>{review.assignment} · </>}
                {new Date(review.submittedAt).toLocaleString()}
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Combined local overlap', review.similarity],
                  ['Token n-gram overlap', review.lexicalSimilarity],
                  ['Control-construct overlap', review.structuralSimilarity],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[#E3E7E0] bg-white p-3">
                    <dt className="text-[11px] leading-4 text-[#707A72]">{label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-[#202923]">{value}%</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-5 text-[#707A72]">
                These values describe overlap in the compared samples only. No validated assignment baseline or chance-of-coincidence estimate is available.
              </p>
              {review.commonAlgorithm && (
                <p className="mt-3 rounded-lg border border-[#F6E0B5] bg-[#FFF9EC] p-3 text-xs leading-5 text-[#684713]">
                  Common algorithm context: {review.commonAlgorithm}. This is a heuristic context label, not proof of independent work or misconduct.
                </p>
              )}
            </section>
          ) : (
            <div className="mt-6 rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-4 text-sm leading-6 text-[#5E6961]">
              No comparison context has been prepared in this browser. This response form is still available for general feedback.
            </div>
          )}

          {review && (
            <section className="mt-6 space-y-4">
              <div className="rounded-xl border border-[#E3E7E0] bg-white p-4">
                <h2 className="text-sm font-semibold">Paired exact-line evidence</h2>
                <p className="mt-1 text-xs leading-5 text-[#707A72]">Whitespace and case are normalized. This simple check is not AST matching.</p>
                {review.lineEvidence.length ? (
                  <ul className="mt-3 space-y-2">
                    {review.lineEvidence.map((item, index) => (
                      <li key={`${item.firstLine}-${item.secondLine}-${index}`} className="rounded-lg bg-[#F7F6F0] p-3 font-mono text-xs">
                        <span className="mb-1 block font-sans text-[11px] font-semibold text-[#707A72]">Sample A line {item.firstLine} ↔ Sample B line {item.secondLine}</span>
                        <code>{item.excerpt}</code>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-3 text-xs text-[#707A72]">No identical non-comment lines were found by this simple check.</p>}
              </div>
              <h2 className="text-sm font-semibold">Compared code samples</h2>
              {[['Sample A', review.code1], ['Sample B', review.code2]].map(([label, code]) => (
                <details key={label} className="overflow-hidden rounded-xl border border-[#E3E7E0]">
                  <summary className="cursor-pointer bg-[#F7F6F0] px-4 py-3 text-sm font-medium">{label}</summary>
                  <pre className="max-h-96 overflow-auto bg-white p-4 text-xs leading-5 text-[#354139]"><code>{code}</code></pre>
                </details>
              ))}
              <p className="text-xs leading-5 text-[#707A72]">These samples were saved in this browser. Anyone with access to this browser profile may be able to inspect them.</p>
            </section>
          )}

          <section className="mt-7">
            <label htmlFor="student-response" className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquareText size={17} className="text-[#174C3C]" /> Your response or context
            </label>
            <p className="mt-1 text-xs leading-5 text-[#707A72]">You can describe your reasoning, resources or examples used, or anything else you want a reviewer to consider. No automatic score is applied.</p>
            <textarea
              id="student-response"
              value={response}
              onChange={event => { setResponse(event.target.value); setSaved(false); }}
              maxLength={5000}
              rows={7}
              placeholder="Write your response here..."
              className="mt-3 w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-[#8A938B]">
              <span>Saved only in this browser; it is not sent to your instructor.</span>
              <span>{response.length}/5000</span>
            </div>
            {error && <p role="alert" className="mt-3 rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-sm text-[#A82A2A]">{error}</p>}
            {auditWarning && <p role="alert" className="mt-3 rounded-lg border border-[#F6E0B5] bg-[#FFF9EC] p-3 text-sm text-[#684713]">{auditWarning}</p>}
            {saved && <p role="status" className="mt-3 flex items-center gap-2 rounded-lg border border-[#C3E4CF] bg-[#E4F1E9] p-3 text-sm text-[#174C3C]"><CheckCircle2 size={17} /> Your response was saved locally in this browser.</p>}
            <button type="button" onClick={handleSaveResponse} className="mt-4 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382D]">
              Save response in this browser
            </button>
          </section>

          <div className="mt-8 border-t border-[#E3E7E0] pt-5 text-xs leading-5 text-[#707A72]">
            <strong className="text-[#354139]">Local response:</strong> a response saved here is not visible to faculty and does not sync to another device. Use your institution’s official process to submit a formal response.
          </div>
        </section>

        <nav aria-label="Legal" className="mt-5 flex justify-center gap-5 text-xs text-[#707A72]">
          <PolicyLink to="/privacy" className="hover:text-[#174C3C]">Privacy Policy</PolicyLink>
          <PolicyLink to="/terms" className="hover:text-[#174C3C]">Terms and Conditions</PolicyLink>
        </nav>
      </div>
    </main>
  );
}
