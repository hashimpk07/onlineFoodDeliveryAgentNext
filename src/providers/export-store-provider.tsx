"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { useStore } from "zustand";

import {
  createExportStore,
  type ExportState,
} from "@/stores/export/export-store";

export type ExportStoreApi = ReturnType<typeof createExportStore>;

const ExportStoreContext = createContext<ExportStoreApi | undefined>(undefined);

export interface ExportStoreProviderProps {
  children: ReactNode;
}

export const ExportStoreProvider = ({ children }: ExportStoreProviderProps) => {
  const [store] = useState(() => createExportStore());

  return (
    <ExportStoreContext.Provider value={store}>
      {children}
    </ExportStoreContext.Provider>
  );
};

export const useExportStore = <T,>(selector: (store: ExportState) => T): T => {
  const exportStoreContext = useContext(ExportStoreContext);

  if (!exportStoreContext) {
    throw new Error("useExportStore must be used within ExportStoreProvider");
  }

  return useStore(exportStoreContext, selector);
};
