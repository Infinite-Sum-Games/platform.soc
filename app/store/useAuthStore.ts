import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  githubUsername: string;
  email: string;
  bounty: number;
}

export interface AuthState {
  user: AuthUser | null;
  setTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
    githubUsername: string;
    email: string;
    bounty: number;
  }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setTokens: ({
        accessToken,
        refreshToken,
        githubUsername,
        email,
        bounty,
      }) =>
        set(() => ({
          user: {
            accessToken,
            refreshToken,
            githubUsername,
            email,
            bounty,
          },
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
