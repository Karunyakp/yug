import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, FileCheck2, ShieldCheck } from 'lucide-react';
import { createLocalAccount } from '../services/localAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsCreating(true);
    try {
      await createLocalAccount(name, email, password);
      navigate('/dashboard');
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Unable to create a local account.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F6F0] text-[#202923]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute -left-36 -top-32 h-[440px] w-[440px] rounded-full bg-[#E4F1E9] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[#B96F52]/10 blur-3xl" />
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#707A72] transition hover:text-[#174C3C]">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <div className="mt-14 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174C3C] text-white shadow-sm">
                <ShieldCheck size={23} />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight">CodeGuard AI</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#707A72]">Academic integrity platform</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-xl py-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C3E4CF] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#174C3C]">
              <span className="h-2 w-2 rounded-full bg-[#174C3C]" />
              A thoughtful workspace for educators
            </div>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] xl:text-6xl">
              Make review
              <span className="mt-1 block text-[#174C3C]">clear and fair.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#707A72]">
              Bring code comparisons, evidence, and instructor review together in one calm, organized workspace.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E3E7E0] bg-white/80 p-4">
                <FileCheck2 className="mb-3 h-5 w-5 text-[#174C3C]" />
                <p className="text-sm font-semibold">Evidence you can inspect</p>
                <p className="mt-1 text-xs leading-5 text-[#707A72]">Explore code matches and context before making a decision.</p>
              </div>
              <div className="rounded-2xl border border-[#E3E7E0] bg-white/80 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-[#174C3C]" />
                <p className="text-sm font-semibold">Human-led review</p>
                <p className="mt-1 text-xs leading-5 text-[#707A72]">Automated indicators support instructor judgment; they do not replace it.</p>
              </div>
            </div>
          </div>
          <p className="relative z-10 text-xs text-[#8A938B]">Accounts created here stay in this browser.</p>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-10 lg:my-8 lg:min-h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-[#E3E7E0] lg:px-14 lg:shadow-[0_18px_60px_-36px_rgba(32,41,35,0.22)]">
          <div className="w-full max-w-[420px]">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#707A72] transition hover:text-[#174C3C] lg:hidden">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174C3C]">Faculty workspace</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Create your account</h2>
            <p className="mt-2 text-sm leading-6 text-[#707A72]">Set up a local demo account to explore CodeGuard AI.</p>

            <div className="mt-5 rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-3 text-xs leading-5 text-[#707A72]">
              Frontend-only demo accounts are saved in this browser and are not production authentication.
            </div>

            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
              {error && (
                <p role="alert" className="rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] px-3.5 py-2.5 text-sm text-[#A82A2A]">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="signup-name" className="mb-2 block text-sm font-medium text-[#354139]">Full name</label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Prof. Jane Doe"
                  className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-[#354139]">University email</label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@university.edu"
                  className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-[#354139]">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8A938B] hover:text-[#202923]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="mb-2 block text-sm font-medium text-[#354139]">Confirm password</label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    placeholder="Enter the password again"
                    className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-[#A0A8A1] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8A938B] hover:text-[#202923]">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10382D] focus:outline-none focus:ring-4 focus:ring-[#174C3C]/20 disabled:cursor-wait disabled:opacity-60"
              >
                {isCreating ? 'Creating account...' : 'Create account'}
                {!isCreating && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#707A72]">
              Already have an account? <Link to="/login" className="font-semibold text-[#174C3C] hover:text-[#10382D]">Sign in</Link>
            </p>
            <div className="mt-6 flex justify-center gap-4 border-t border-[#EDF0EB] pt-4 text-xs text-[#8A938B]">
              <Link to="/privacy" className="hover:text-[#174C3C]">Privacy</Link>
              <Link to="/terms" className="hover:text-[#174C3C]">Terms</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
