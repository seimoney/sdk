import { HttpClient } from "./core/http-client";
import { AuthModule } from "./modules/auth";
import { AccountsModule } from "./modules/accounts";
import { PaymentLinksModule } from "./modules/payment-links";
import { FilesModule } from "./modules/files";
import { ContractsModule } from "./modules/contracts";
import { AnalyticsModule } from "./modules/analytics";
import { ProductsModule } from "./modules/products";
import type { SDKConfig } from "./types";

export class SeiMoneySDK {
  private httpClient: HttpClient;

  public readonly auth: AuthModule;
  public readonly accounts: AccountsModule;
  public readonly paymentLinks: PaymentLinksModule;
  public readonly files: FilesModule;
  public readonly contracts: ContractsModule;
  public readonly analytics: AnalyticsModule;
  public readonly products: ProductsModule;

  constructor(config: SDKConfig) {
    // Validate required configuration
    if (!config.apiUrl) {
      throw new Error("API URL is required");
    }

    this.httpClient = new HttpClient(config);

    // Initialize all modules
    this.auth = new AuthModule(this.httpClient);
    this.accounts = new AccountsModule(this.httpClient);
    this.paymentLinks = new PaymentLinksModule(this.httpClient);
    this.files = new FilesModule(this.httpClient);
    this.contracts = new ContractsModule(this.httpClient);
    this.analytics = new AnalyticsModule(this.httpClient);
    this.products = new ProductsModule(this.httpClient);
  }

  /**
   * Set the authorization token
   */
  setToken(token: string): void {
    this.httpClient.setToken(token);
  }

  /**
   * Get the current SDK version
   */
  static getVersion(): string {
    return "1.0.0";
  }
}

// Factory function for easier initialization
export function createSeiMoneySDK(config: SDKConfig): SeiMoneySDK {
  return new SeiMoneySDK(config);
}
