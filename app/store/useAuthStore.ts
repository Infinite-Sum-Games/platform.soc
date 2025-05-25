import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  access_token: string;
  refresh_token: string;
  github_username: string;
  email: string;
  bounty: number;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
