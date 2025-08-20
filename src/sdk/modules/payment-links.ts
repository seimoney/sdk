import { WalletClient } from "viem";
import type { HttpClient } from "../core/http-client";
import type {
  Link,
  CreatePaymentLink,
  DeletePaymentLink,
  FulFillPaymentLink,
} from "../types";

export class PaymentLinksModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all payment links for the authenticated user
   */
  async getPaymentLinks(): Promise<Link[]> {
    return await this.httpClient.get<Link[]>("/payment-links");
  }

  /**
   * Get a specific payment link by ID
   */
  async getPaymentLink(paymentId: string): Promise<Link> {
    return await this.httpClient.get<Link>(`/payment-links/${paymentId}`);
  }

  /**
   * Create a new payment link
   */
  async createPaymentLink(params: CreatePaymentLink): Promise<Link> {
    return await this.httpClient.post<Link>("/payment-links/create", params);
  }

  /**
   * Delete a payment link
   */
  async deletePaymentLink(params: DeletePaymentLink): Promise<boolean> {
    return await this.httpClient.post<boolean>("/payment-links/delete", params);
  }

  /**
   * Fulfill a payment link transaction
   */
  async fulfillPaymentLink(
    params: FulFillPaymentLink,
    walletClient?: WalletClient
  ): Promise<string> {
    return await this.httpClient.get<string>(
      `/payment-links/fulfill/${params.paymentId}`,
      undefined,
      walletClient
    );
  }
}
