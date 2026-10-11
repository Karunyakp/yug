const ACCOUNTS_KEY = 'codeguard:accounts';

export const WORKSPACE_LOGIN_CREDENTIALS = {
  name: 'Workspace Faculty',
  email: 'faculty@codeguard.app',
  password: 'ReviewAccess2026!',
};

export interface LocalAccount {
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
}

function isLocalAccount(value: unknown): value is LocalAccount {
  if (typeof value !== 'object' || value === null) return false;
  const account = value as Record<string, unknown>;
  return typeof account.name === 'string' &&
    typeof account.email === 'string' &&
    typeof account.salt === 'string' && /^[a-f0-9]{32}$/i.test(account.salt) &&
    typeof account.passwordHash === 'string' && /^[a-f0-9]{64}$/i.test(account.passwordHash) &&
    typeof account.createdAt === 'string';
}

function getAccounts(): LocalAccount[] {
  const stored = localStorage.getItem(ACCOUNTS_KEY);
  if (!stored) return [];

  const accounts: unknown = JSON.parse(stored);
  if (!Array.isArray(accounts) || !accounts.every(isLocalAccount)) {
    throw new Error('Saved local accounts are invalid. Clear this browser’s CodeGuard account data and try again.');
  }
  return accounts;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: Uint8Array<ArrayBuffer>): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 120_000, hash: 'SHA-256' },
    key,
    256,
  );
  return bytesToHex(new Uint8Array(bits));
}

export async function createLocalAccount(name: string, email: string, password: string): Promise<void> {
  if (!name.trim()) throw new Error('Enter your full name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Enter a valid email address.');
  }
  if (password.length < 8) throw new Error('Password must be at least 8 characters.');

  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  if (accounts.some(account => account.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account with this email already exists in this browser.');
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const account: LocalAccount = {
    name: name.trim(),
    email: normalizedEmail,
    salt: bytesToHex(salt),
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('currentUserEmail', normalizedEmail);
}

export async function signInLocally(email: string, password: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  const account = accounts.find(saved => saved.email.toLowerCase() === normalizedEmail);

  if (!account) {
    if (
      normalizedEmail === WORKSPACE_LOGIN_CREDENTIALS.email &&
      password === WORKSPACE_LOGIN_CREDENTIALS.password
    ) {
      await createLocalAccount(
        WORKSPACE_LOGIN_CREDENTIALS.name,
        WORKSPACE_LOGIN_CREDENTIALS.email,
        WORKSPACE_LOGIN_CREDENTIALS.password,
      );
      return;
    }
    throw new Error('No local account matches those credentials. Create an account in this browser first.');
  }

  const salt = Uint8Array.from(account.salt.match(/.{2}/g) ?? [], byte => Number.parseInt(byte, 16));
  const passwordHash = await hashPassword(password, salt);
  if (passwordHash !== account.passwordHash) {
    throw new Error('The email or password is incorrect.');
  }

  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('currentUserEmail', normalizedEmail);
}

export function getLocalAccountsForExport(): Array<Pick<LocalAccount, 'name' | 'email' | 'createdAt'>> {
  return getAccounts().map(({ name, email, createdAt }) => ({ name, email, createdAt }));
}

export function getCurrentLocalAccount(): Pick<LocalAccount, 'name' | 'email' | 'createdAt'> | null {
  const currentEmail = localStorage.getItem('currentUserEmail');
  if (!currentEmail) return null;

  const account = getAccounts().find(saved => saved.email.toLowerCase() === currentEmail.toLowerCase());
  return account ? { name: account.name, email: account.email, createdAt: account.createdAt } : null;
}
