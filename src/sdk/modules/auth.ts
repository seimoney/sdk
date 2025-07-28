import type { HttpClient } from "../core/http-client";
import type { Account, Authorization } from "../types";

export class AuthModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Authorize a user and get an access token
   */
  async authorize(params: Authorization): Promise<Account & { token: string }> {
    return await this.httpClient.post<Account & { token: string }>(
      "/authorize",
      params
    );
  }

  /**
   * Set the authorization token for subsequent requests
   */
  setToken(token: string): void {
    this.httpClient.setToken(token);
  }
}
