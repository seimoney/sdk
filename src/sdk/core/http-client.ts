/* eslint-disable @typescript-eslint/no-explicit-any */
import { withPaymentInterceptor } from "@seimoney/sei-x402-axios";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { WalletClient } from "viem";
import type { SDKConfig, SDKError } from "../types";

export class HttpClient {
  private baseClient: AxiosInstance;
  private client: AxiosInstance;
  private config: SDKConfig;
  private token?: string;

  constructor(config: SDKConfig) {
    this.config = config;
    this.token = config.token;

    this.baseClient = axios.create({
      baseURL: this.config.apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client = this.baseClient;
    this.setupInterceptors();

    if (this.token) {
      this.setToken(this.token);
    } else if (localStorage) {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        this.setToken(savedToken);
      }
    }
  }

  private setupInterceptors(): void {
    // Request interceptor for error handling
    this.baseClient.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(this.createSDKError(error))
    );

    // Response interceptor for error handling
    this.baseClient.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.createSDKError(error))
    );
  }

  private createSDKError(error: any): SDKError {
    if (error.response) {
      return {
        code: `HTTP_${error.response.status}`,
        message: error.response.data?.message || error.message,
        details: error.response.data,
      };
    } else if (error.request) {
      return {
        code: "NETWORK_ERROR",
        message: "Network error - please check your connection",
        details: error.request,
      };
    } else {
      return {
        code: "UNKNOWN_ERROR",
        message: error.message || "An unknown error occurred",
        details: error,
      };
    }
  }

  setToken(token: string): void {
    this.token = token;
    this.baseClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (localStorage) {
      localStorage.setItem("token", token);
    }
  }

  updateWalletClient(walletClient: WalletClient | null): void {
    if (walletClient && walletClient.account) {
      this.client = withPaymentInterceptor(
        this.baseClient,
        walletClient as any
      );
    } else {
      this.client = this.baseClient;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }
}
