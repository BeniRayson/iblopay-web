export interface TokenPair {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
export interface DecodedToken {
    sub: string;
    role: string;
    permissions: string[];
    iat: number;
    exp: number;
}
//# sourceMappingURL=token.model.d.ts.map