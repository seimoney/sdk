import type { HttpClient } from "../core/http-client";
import type { 
  Product, 
  CreateProduct, 
  ImageFile, 
  Checkout 
} from "../types";

export class ProductsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get checkout information
   */
  async getCheckout(): Promise<Checkout | null> {
    return await this.httpClient.get<Checkout | null>("/checkout");
  }

  /**
   * Get all products for the authenticated user
   */
  async getProducts(): Promise<Product[]> {
    return await this.httpClient.get<Product[]>("/checkout/products");
  }

  /**
   * Get a specific product by ID
   */
  async getProduct(productId: string): Promise<Product> {
    return await this.httpClient.get<Product>(`/checkout/products/${productId}`);
  }

  /**
   * Create a new product with images
   */
  async createProduct(params: CreateProduct, files: ImageFile[]): Promise<Product | null> {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      formData.set(key, JSON.stringify(value));
    });

    files.forEach((file, index) => {
      formData.append("files", file.file);
      if (file.caption) {
        formData.set(`caption-${index + 1}`, file.caption);
      }
    });

    return await this.httpClient.post<Product | null>("/products/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}