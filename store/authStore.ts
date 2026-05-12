// store/authStore.ts
import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

// Demo accounts (simulates a real database)
const DEMO_USERS = [
  { email: "demo@nextstore.com", password: "demo1234", name: "Demo User" },
];

function makeAvatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=128`;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  login: (email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    set({ user: { name: found.name, email: found.email, avatar: makeAvatar(found.name) } });
    return { ok: true };
  },

  register: (name, email, password) => {
    if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email." };
    // Simulate saving to DB — in prod, call POST /api/auth/register
    DEMO_USERS.push({ email, password, name });
    set({ user: { name, email, avatar: makeAvatar(name) } });
    return { ok: true };
  },

  logout: () => set({ user: null }),
}));
