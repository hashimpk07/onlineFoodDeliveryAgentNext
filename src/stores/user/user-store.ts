import { createStore } from "zustand/vanilla";

import type { User } from "./_schema";

export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
};

export const createUserStore = (init?: Partial<UserState>) =>
  createStore<UserState>()((set) => ({
    user: init?.user ?? null,
    isAuthenticated: init?.isAuthenticated ?? false,
    isLoading: init?.isLoading ?? false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
    setLoading: (loading) => set({ isLoading: loading }),
  }));
