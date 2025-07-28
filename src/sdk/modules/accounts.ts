import type { HttpClient } from "../core/http-client";
import type { Account, CreateAccount } from "../types";

export class AccountsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get account information by owner address
   */
  async getAccount(): Promise<Account> {
    return await this.httpClient.get<Account>(`/accounts}`);
  }

  /**
   * Create a new account
   */
  async createAccount(params: CreateAccount): Promise<Account> {
    return await this.httpClient.post<Account>("/create/account", params);
  }
}
