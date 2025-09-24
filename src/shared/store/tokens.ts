class TokenStore {
  private readonly REFRESH_TOKEN_KEY = "refreshToken";
  private readonly ACCESS_TOKEN_KEY = "accessToken";

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) ?? null;
  }

  set refreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) ?? null;
  }

  set accessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  clear() {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}

export const tokenStore = new TokenStore();
