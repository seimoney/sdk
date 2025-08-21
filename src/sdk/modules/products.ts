import { WalletClient } from "viem";
import type { HttpClient } from "../core/http-client";
import type {
  Product,
  CreateCheckout,
  CreateProduct,
  ImageFile,
  Checkout,
} from "../types";

export class ProductsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get checkout information
   */
  async getCheckoutWithAuth(): Promise<Checkout | null> {
    return await this.httpClient.get<Checkout | null>(`/checkout`);
  }

  async getCheckout(checkoutId: string): Promise<Checkout | null> {
    return await this.httpClient.get<Checkout | null>(
      `/checkout/${checkoutId}`
    );
  }

  /**
   * Create new checkout
   */
  async createCheckout(params: CreateCheckout): Promise<Checkout | null> {
    return await this.httpClient.post<Checkout | null>(
      "/checkout/create",
      params
    );
  }

  /**
   * Get all products for a checkout
   */
  async getProducts(checkoutId: string): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(
      `/checkout/products/${checkoutId}`
    );
  }

  /**
   * Get a specific product by ID
   */
  async getProduct(productId: string): Promise<Product> {
    return await this.httpClient.get<Product>(
      `/checkout/products/product/${productId}`
    );
  }

  /**
   * Create a new product with images
   */
  async createProduct(
    params: CreateProduct,
    files: ImageFile[]
  ): Promise<Product | null> {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      if (value)
        formData.set(
          key,
          typeof value === "object" ? JSON.stringify(value) : value?.toString()
        );
    });

    files.forEach((file, index) => {
      formData.append("files", file.file);
      if (file.caption) {
        formData.set(`caption-${index + 1}`, file.caption);
      }
    });

    return await this.httpClient.post<Product | null>(
      "/checkout/products/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async fulfill(
    productId: string,
    quantity: number,
    walletClient?: WalletClient
  ) {
    return await this.httpClient.get<string>(
      `/checkout/fulfill/${productId}?quantity=${quantity}`,
      undefined,
      walletClient
    );
  }
}
