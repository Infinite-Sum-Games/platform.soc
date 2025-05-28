import { create } from 'zustand';
type TStoreUserData = {
  fullName: string;
  username: string;
  bounty: number;
  accountActive: boolean;
  rank: number;
  _count: { Solution: string };
};

interface LeaderboardState {
  User: Record<string, TStoreUserData>; // Keyed by username
  setUser: (
    fullName: string,
    username: string,
    rank: number,
    bounty: number,
    accountActive: boolean,
    _count: { Solution: string },
  ) => void;
  clearUser: () => void;
  getRank: (username: string) => number | undefined; // Function to get a user's rank
}

const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  User: {},
  setUser: (fullName, username, rank, bounty, accountActive, _count) =>
    set((state) => ({
      User: {
        ...state.User,
        [username]: {
          fullName,
          username,
          rank,
          bounty,
          accountActive,
          _count,
        },
      },
    })),
  clearUser: () => set({ User: {} }),
  getRank: (username) => {
    const user = get().User[username];
    return user ? user.rank : undefined; // Returns the rank or undefined if the user doesn't exist
  },
}));

export default useLeaderboardStore;
