import { createStore } from "zustand/vanilla";

export type ExportState = {
  isOpen: boolean;
  method: "GET" | "POST";
  reportType: string | null;
  exportUrl: string | null;
  payload: Record<string, unknown> | null;
  openModal: (params: {
    reportType: string;
    exportUrl: string;
    payload?: Record<string, unknown>;
    method?: "GET" | "POST";
  }) => void;
  closeModal: () => void;
};

export const createExportStore = (init?: Partial<ExportState>) =>
  // eslint-disable-next-line complexity
  createStore<ExportState>()((set) => ({
    isOpen: init?.isOpen ?? false,
    method: init?.method ?? "POST",
    reportType: init?.reportType ?? null,
    exportUrl: init?.exportUrl ?? null,
    payload: init?.payload ?? null,
    openModal: ({ reportType, exportUrl, payload, method = "POST" }) =>
      set({
        isOpen: true,
        reportType,
        exportUrl,
        payload: payload ?? null,
        method,
      }),
    closeModal: () =>
      set({
        isOpen: false,
        reportType: null,
        exportUrl: null,
        payload: null,
        method: "POST",
      }),
  }));
