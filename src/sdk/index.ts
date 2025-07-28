// Main SDK exports
export { SeiMoneySDK, createSeiMoneySDK } from "./sei-money-sdk";

// Core exports
export { HttpClient } from "./core/http-client";

// Module exports
export { AuthModule } from "./modules/auth";
export { AccountsModule } from "./modules/accounts";
export { PaymentLinksModule } from "./modules/payment-links";
export { FilesModule } from "./modules/files";
export { ContractsModule } from "./modules/contracts";
export { AnalyticsModule } from "./modules/analytics";
export { ProductsModule } from "./modules/products";

// Type exports
export type {
  // Core types
  SDKConfig,
  SDKError,
  Token,
  ERC20Amount,

  // Account types
  Account,
  CreateAccount,
  Authorization,

  // Payment Link types
  Link,
  CreatePaymentLink,
  DeletePaymentLink,
  FulFillPaymentLink,

  // File types
  GatedFile,
  UploadFile,
  DeleteFile,
  FulFillFile,
  DownloadFile,

  // Contract types
  Contract,
  CreateContract,
  SignContract,
  CreateContractExtract,

  // Analytics types
  Activity,
  Analytics,

  // Product types
  Product,
  CreateProduct,
  ImageFile,
  Image,
  Checkout,
  Schedule,
  Location,
} from "./types";
