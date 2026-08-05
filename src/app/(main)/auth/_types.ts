export interface SessionPayload {
  userId: string | number;
  email: string;
  name: string;
  role: string;
  token: string;
  expiresAt: number;
  avatar?: string;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role: {
    id: number;
    name: string;
    display_name: string;
  };
  avatar?: string;
}

export interface LaravelLoginResponse {
  status: "success" | "error";
  message: string;
  data?: Array<{
    user: LoginUser;
    token: string;
  }>;
}
