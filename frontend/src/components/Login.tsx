import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import { signInLocally } from '../services/localAuth';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSigningIn(true);
    try {
      await signInLocally(email, password);
      navigate('/dashboard');
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in locally.');
    } finally {
      setIsSigningIn(false);
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
              <ArrowLeft size={16} />
              Back to home
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
              Thoughtful review. Defensible decisions.
            </div>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#202923] xl:text-6xl">
              Protect original work.
              <span className="mt-1 block text-[#174C3C]">Support fair review.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#707A72]">
              A clear, evidence-led workspace for instructors to understand code similarities and make informed academic decisions.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E3E7E0] bg-white/80 p-4">
                <FileCheck2 className="mb-3 h-5 w-5 text-[#174C3C]" />
                <p className="text-sm font-semibold">Evidence you can inspect</p>
                <p className="mt-1 text-xs leading-5 text-[#707A72]">Review matched code and context before drawing conclusions.</p>
              </div>
              <div className="rounded-2xl border border-[#E3E7E0] bg-white/80 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-[#174C3C]" />
                <p className="text-sm font-semibold">Human-led decisions</p>
                <p className="mt-1 text-xs leading-5 text-[#707A72]">Analysis supports instructor judgment; it does not replace it.</p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-[#8A938B]">
            Built for transparent and responsible academic review.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-10 lg:my-8 lg:min-h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-[#E3E7E0] lg:px-14 lg:shadow-[0_18px_60px_-36px_rgba(32,41,35,0.22)]">
          <div className="w-full max-w-[420px]">
            <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#707A72] transition hover:text-[#174C3C] lg:hidden">
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F1E9] text-[#174C3C]">
              <LockKeyhole size={22} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174C3C]">Faculty workspace</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#202923]">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-[#707A72]">
              Sign in to continue to your CodeGuard review workspace.
            </p>

            <form onSubmit={handleSignIn} className="mt-8 space-y-5">
              <div className="rounded-lg border border-[#E3E7E0] bg-[#F7F6F0] px-3.5 py-2.5 text-xs leading-5 text-[#707A72]">
                Accounts are stored in this browser only. This sign-in does not provide production security.
              </div>
              {error && <p role="alert" className="rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] px-3.5 py-2.5 text-sm text-[#A82A2A]">{error}</p>}
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-[#354139]">
                  University email
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@university.edu"
                  className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 text-sm text-[#202923] outline-none transition placeholder:text-[#A0A8A1] hover:border-[#B9C3BA] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="text-sm font-medium text-[#354139]">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm font-medium text-[#174C3C] hover:text-[#10382D]">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#D9DED8] bg-white px-4 py-3 pr-12 text-sm text-[#202923] outline-none transition placeholder:text-[#A0A8A1] hover:border-[#B9C3BA] focus:border-[#174C3C] focus:ring-4 focus:ring-[#174C3C]/10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8A938B] transition hover:text-[#202923] focus:outline-none focus:ring-2 focus:ring-[#174C3C]/30"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10382D] focus:outline-none focus:ring-4 focus:ring-[#174C3C]/20 active:translate-y-px"
              >
                {isSigningIn ? 'Signing in...' : 'Sign in'}
                <ArrowRight size={17} />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#707A72]">
              New to CodeGuard?{' '}
              <Link to="/signup" className="font-semibold text-[#174C3C] hover:text-[#10382D]">
                Create an account
              </Link>
            </p>

            <nav aria-label="Legal" className="mt-6 flex justify-center gap-5 text-xs text-[#8A938B]">
              <Link to="/privacy" className="transition hover:text-[#174C3C]">Privacy Policy</Link>
              <Link to="/terms" className="transition hover:text-[#174C3C]">Terms and Conditions</Link>
            </nav>

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#EDF0EB] pt-5 text-xs text-[#8A938B]">
              <LockKeyhole size={13} />
              Your workspace is protected with secure sign-in.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
