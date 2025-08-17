import type { Hex } from "viem";
import type { Network } from "@seimoney/sei-x402/types";

export type Token = {
  name: string;
  icon: string;
  address: Hex;
  symbol: string;
  decimals: number;
  assetVersion: string;
  priceUSD: number;
};

export type ERC20Amount = {
  amount: string;
  token: Token;
};

export type Account = {
  owner: Hex;
  name?: string;
  avatarURL?: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type CreateAccount = {
  owner: Hex;
  name?: string;
  avatarURL?: string;
  emailAddress: string;
};

export type Link = {
  paymentId: string;
  description: string;
  imageURL: string;
  attributes: Record<string, string>;
  owner: Hex;
  recipientAddress: Hex;
  amount: ERC20Amount;
  oneTime: boolean;
  nonce: number;
  status: "pending" | "paid" | "expired" | "active";
  createdAt: Date;
  updatedAt?: Date;
  network: Network;
};

export type CreatePaymentLink = {
  description: string;
  amount: ERC20Amount;
  attributes: Record<string, string>;
  recipientAddress?: Hex;
  oneTime: boolean;
  network: Network;
};

export type DeletePaymentLink = {
  paymentId: string;
  signature: Hex;
  expiresAt: number;
};

export type FulFillPaymentLink = {
  paymentId: string;
};

export type GatedFile = {
  fileId: string;
  name: string;
  description: string;
  previewURL: string;
  metadata: Record<string, string>;
  owner: Hex;
  amount: ERC20Amount;
  downloads: number;
  createdAt: Date;
  updatedAt?: Date;
  network: Network;
};

export type UploadFile = {
  name: string;
  description: string;
  previewURL: string | null;
  metadata: Record<string, string>;
  amount: ERC20Amount;
  network: Network;
};

export type DownloadFile = {
  fileId: string;
  signature: Hex;
  expiresAt: number;
};

export type DeleteFile = {
  fileId: string;
  signature: Hex;
  expiresAt: number;
};

export type FulFillFile = {
  fileId: string;
};

export type Authorization = {
  owner: Hex;
  signature: Hex;
  expiresAt: number;
};

export type SignContract = {
  contractId: string;
  signature: Hex;
  expiresAt: number;
};

export type Contract = {
  contractId: string;
  address: Hex;
  name: string;
  role: {
    title: string;
    description: string;
  };
  owner: Hex;
  recipientAddress: Hex;
  payroll: {
    frequency: "hourly" | "12-hours" | "daily" | "weekly" | "monthly";
    amount: ERC20Amount;
  };
  metadata: Record<string, string>;
  signed: {
    status: boolean;
    timestamp?: number;
  };
  company: string;
  network: Network;
  documentURL?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type CreateContract = {
  name: string;
  role: {
    title: string;
    description: string;
  };
  recipientAddress?: Hex;
  payroll: {
    frequency: "hourly" | "12-hours" | "daily" | "weekly" | "monthly";
    amount: ERC20Amount;
  };
  metadata: Record<string, string>;
  company: string;
  documentURL?: string;
  network: Network;
};

export type CreateContractExtract = {
  name?: string;
  role: { title?: string; description?: string };
  recipientAddress?: Hex;
  payroll: {
    frequency?: "daily" | "weekly" | "monthly";
    amount: {
      amount?: string;
    };
  };
  metadata?: Record<string, string>;
  company?: string;
};

export type Activity = {
  owner: Hex;
  id: string;
  description: string;
  amount: ERC20Amount;
  type: "link" | "file" | "contract";
  status: "failed" | "success";
  transaction?: string;
  createdAt?: Date;
  updateAt?: Date;
};

export type Analytics = {
  totalRevenueUSD: number;
  totalPaymentLinks: {
    active: number;
    inActive: number;
  };
  totalFiles: {
    active: number;
    inActive: number;
  };
  totalContracts: {
    active: number;
    inActive: number;
  };
  recentsActivities: Activity[];
  recentRevenues: Record<string, number>;
  activeContracts: Record<string, number>;
};

export type Product = {
  productId: string;
  name: string;
  description: string;
  availableInStock: number;
  maxQuantity?: number;
  isFeatured: boolean;
  isOnSale: boolean;
  images: Image[];
  amount: ERC20Amount;
  owner: Hex;
  checkoutId: string;
  createdAt: Date;
  updatedAt?: Date;
  network: Network;
};

export type Schedule = {
  timezone: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[];
};

export type Location = {
  address: string;
  city?: string;
  zipCode?: string;
  country?: string;
};

export type Checkout = {
  checkoutId: string;
  owner: Hex;
  name: string;
  tagline: string;
  about: string;
  category: string;
  logoURL: string;
  location: Location;
  schedule: Schedule;
};

export type CreateProduct = {
  name: string;
  description: string;
  availableInStock: number;
  maxQuantity?: number;
  isFeatured: boolean;
  isOnSale: boolean;
  amount: ERC20Amount;
  network: Network;
};

export type ImageFile = {
  file: File;
  caption?: string;
};

export type Image = {
  url: string;
  caption?: string;
};

export type SDKConfig = {
  apiUrl: string;
  token?: string;
};

export type SDKError = {
  code: string;
  message: string;
  details?: string;
};
