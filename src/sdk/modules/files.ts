import type { HttpClient } from "../core/http-client";
import type { 
  GatedFile, 
  UploadFile, 
  DeleteFile, 
  FulFillFile, 
  DownloadFile 
} from "../types";

export class FilesModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all files for the authenticated user
   */
  async getFiles(): Promise<GatedFile[]> {
    return await this.httpClient.get<GatedFile[]>("/files");
  }

  /**
   * Get a specific file by ID
   */
  async getFile(fileId: string): Promise<GatedFile> {
    return await this.httpClient.get<GatedFile>(`/files/${fileId}`);
  }

  /**
   * Upload a new gated file
   */
  async uploadFile(params: UploadFile, file: File): Promise<GatedFile> {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      formData.set(key, JSON.stringify(value));
    });

    formData.set("file", file);

    return await this.httpClient.post<GatedFile>("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Download a file (get download URL)
   */
  async downloadFile(params: DownloadFile): Promise<{ url: string }> {
    return await this.httpClient.post<{ url: string }>("/files/download", params);
  }

  /**
   * Delete a file
   */
  async deleteFile(params: DeleteFile): Promise<boolean> {
    return await this.httpClient.post<boolean>("/files/delete", params);
  }

  /**
   * Fulfill a file purchase transaction
   */
  async fulfillFile(params: FulFillFile): Promise<{ url: string; transaction: string }> {
    return await this.httpClient.get<{ url: string; transaction: string }>(`/files/fulfill/${params.fileId}`);
  }
}