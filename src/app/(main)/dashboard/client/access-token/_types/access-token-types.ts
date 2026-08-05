export interface AccessToken {
  id: number;
  name: string;
  token: string;
  created_at: string;
}

export interface AccessTokenResponse {
  tokens: AccessToken[];
}

export interface AccessTokenCreateResponse {
  token: string;
}
