export type ClientDetails = {
  id: number;
  name: string;
  user_name: string;
  client_id: string;
};

export const ORDERTYPES = [
  { value: "1", label: "Express" },
  { value: "2", label: "Scheduled" },
];
