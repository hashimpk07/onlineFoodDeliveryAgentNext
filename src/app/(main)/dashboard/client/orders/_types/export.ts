export type ExportClientOrdersPayload = {
  q?: string | null;
  from_date?: string | null;
  to_date?: string | null;
  shopname?: string | number | null;
  status?: number[] | number | null;
  email: string;
};
