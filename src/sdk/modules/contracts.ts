import type { HttpClient } from "../core/http-client";
import type {
  Contract,
  CreateContract,
  SignContract,
  CreateContractExtract,
} from "../types";

export class ContractsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all contracts for the authenticated user
   */
  async getContracts(): Promise<Contract[]> {
    return await this.httpClient.get<Contract[]>("/contracts");
  }

  /**
   * Get a specific contract by ID
   */
  async getContract(contractId: string): Promise<Contract> {
    return await this.httpClient.get<Contract>(`/contracts/${contractId}`);
  }

  /**
   * Sign a contract
   */
  async signContract(params: SignContract): Promise<Contract> {
    return await this.httpClient.post<Contract>("/contracts/sign", params);
  }

  /**
   * Create a new contract
   */
  async createContract(params: CreateContract, file?: File): Promise<Contract> {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      formData.set(key, JSON.stringify(value));
    });

    if (file) {
      formData.set("file", file);
    }

    return await this.httpClient.post<Contract>("/contracts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Retry a contract transaction
   */
  async fulfillContractTransaction(transaction: string): Promise<boolean> {
    return await this.httpClient.get(`/contracts/retry/${transaction}`);
  }

  /**
   * Extract contract data from a file using AI
   */
  async extractContract(file: File): Promise<CreateContractExtract> {
    const formData = new FormData();
    formData.set("file", file);

    return await this.httpClient.post<CreateContractExtract>(
      "/contracts/extract",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
