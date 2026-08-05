"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { useStore } from "zustand";

import { createUserStore, type UserState } from "@/stores/user/user-store";

export type UserStoreApi = ReturnType<typeof createUserStore>;

const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export interface UserStoreProviderProps {
  children: ReactNode;
  initialUser?: UserState["user"];
}

export const UserStoreProvider = ({
  children,
  initialUser,
}: UserStoreProviderProps) => {
  const [store] = useState(() =>
    createUserStore({
      user: initialUser ?? null,
      isAuthenticated: !!initialUser,
      isLoading: false,
    }),
  );

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserState) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error("useUserStore must be used within UserStoreProvider");
  }

  return useStore(userStoreContext, selector);
};
