export type Message = {
  id: number;
  sender: "client" | "support";
  message: string;
  time: string;
};

export type SendMessageResponse = {
  success: boolean;
  data?: {
    id: number;
    message: string;
    order_id: string;
    created_at: string;
  };
  message?: string;
};
