// src/app/modules/auth/models/token.model.ts
export interface TokenPair {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface DecodedToken {
  sub: string;         // user_id
  role: string;        // role name
  permissions: string[];
  iat: number;
  exp: number;
}
