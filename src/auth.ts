import { useSyncExternalStore } from 'react';

export type Role = 'user' | 'admin';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // demo-only: plain text, localStorage is not secure storage
  role: Role;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const USERS_KEY = 'thala.users.v1';
const SESSION_KEY = 'thala.session.v1';

const SEED_USERS: StoredUser[] = [
  {
    id: 'admin-1',
    name: 'Store Admin',
    email: 'admin@thala.com',
    password: 'admin123',
    role: 'admin',
  },
];

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_USERS;
    // make sure the demo admin always exists, even if localStorage was cleared oddly
    if (!parsed.some((u) => u.role === 'admin')) {
      parsed.push(SEED_USERS[0]);
    }
    return parsed;
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* storage unavailable — ignore */
  }
}

function loadSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

function saveSession(user: SessionUser | null) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable — ignore */
  }
}

let session: SessionUser | null = loadSession();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return session;
}

export class AuthError extends Error {}

export function signup(name: string, email: string, password: string): SessionUser {
  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!trimmedName) throw new AuthError('Enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new AuthError('Enter a valid email.');
  if (password.length < 6) throw new AuthError('Password must be at least 6 characters.');

  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new AuthError('An account with this email already exists.');
  }

  const newUser: StoredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: trimmedName,
    email: normalizedEmail,
    password,
    role: 'user',
  };

  saveUsers([...users, newUser]);

  const sessionUser: SessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  session = sessionUser;
  saveSession(sessionUser);
  emit();
  return sessionUser;
}

export function login(email: string, password: string): SessionUser {
  const normalizedEmail = email.trim().toLowerCase();
  const users = loadUsers();
  const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!found || found.password !== password) {
    throw new AuthError('Incorrect email or password.');
  }

  const sessionUser: SessionUser = { id: found.id, name: found.name, email: found.email, role: found.role };
  session = sessionUser;
  saveSession(sessionUser);
  emit();
  return sessionUser;
}

export function logout() {
  session = null;
  saveSession(null);
  emit();
}

export function useAuth(): SessionUser | null {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function getAllUsers(): StoredUser[] {
  return loadUsers();
}
