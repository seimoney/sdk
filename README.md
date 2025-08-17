# Payment Gateway SDK

A comprehensive TypeScript SDK for interacting with the Payment Gateway API, built with modern web3 capabilities and blockchain integration.

## Features

- **Modular Architecture**: Clean separation of concerns with dedicated modules for each feature area
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Wallet Integration**: Seamless integration with Web3 wallets using Viem
- **Error Handling**: Robust error handling with detailed error information
- **Payment Processing**: Support for ERC20 tokens and blockchain transactions
- **File Management**: Upload and manage gated content with payment requirements
- **Contract Management**: Create and manage smart contracts with automated payroll
- **Analytics**: Comprehensive analytics and activity tracking
- **Product Management**: E-commerce functionality with product and checkout management

## Installation

```bash
npm install @seimoney/sdk
```

## Quick Start

### Basic Setup

```typescript
import { createSeiMoneySDK } from "@seimoney/sdk";

const sdk = createSeiMoneySDK({
  apiUrl: import.meta.env.VITE_API_URL,
  token: "your-auth-token", // Optional
});
```

### With Wallet Integration

```typescript
import { createSeiMoneySDK } from "@seimoney/sdk";
import { createWalletClient } from "viem";

const sdk = createSeiMoneySDK({
  apiUrl: import.meta.env.VITE_API_URL,
});

// Connect your wallet
const walletClient = createWalletClient({
  // wallet configuration
});

sdk.updateWalletClient(walletClient);
```

## Usage Examples

### Authentication

```typescript
// Authorize with wallet signature
const authResult = await sdk.auth.authorize({
  owner: "0x...",
  signature: "0x...",
  expiresAt: Math.floor(Date.now() / 1000) + 3600,
});

sdk.setToken(authResult.token);
```

### Account Management

```typescript
// Create an account
const account = await sdk.accounts.createAccount({
  owner: "0x...",
  name: "John Doe",
  emailAddress: "john@example.com",
});

// Get account info
const accountInfo = await sdk.accounts.getAccount();
```

### Payment Links

```typescript
// Create a payment link
const paymentLink = await sdk.paymentLinks.createPaymentLink({
  description: "Service payment",
  amount: {
    amount: "100.00",
    token: {
      name: "USDC",
      symbol: "USDC",
      address: "0x...",
      decimals: 6,
      // ... other token properties
    },
  },
  attributes: { service: "consultation" },
  oneTime: true,
  network: "sei-testnet",
});

// Get all payment links
const links = await sdk.paymentLinks.getPaymentLinks();

// Fulfill a payment
const result = await sdk.paymentLinks.fulfillPaymentLink({
  paymentId: "payment-id",
});
```

### File Management

```typescript
// Upload a gated file
const file = new File(["content"], "document.pdf");

const gatedFile = await sdk.files.uploadFile(
  {
    name: "Premium Content",
    description: "Exclusive content",
    previewURL: null,
    metadata: { category: "premium" },
    amount: {
      amount: "10.00",
      token: {
        /* token details */
      },
    },
    network: "sei-testnet",
  },
  file
);

// Download a file
const downloadUrl = await sdk.files.downloadFile({
  fileId: "file-id",
  signature: "0x...",
  expiresAt: Math.floor(Date.now() / 1000) + 3600,
});
```

### Contract Management

```typescript
// Create a contract
const contract = await sdk.contracts.createContract({
  name: "Employment Contract",
  role: {
    title: "Developer",
    description: "Full-stack developer role",
  },
  recipientAddress: "0x...",
  payroll: {
    frequency: "monthly",
    amount: {
      amount: "5000.00",
      token: {
        /* token details */
      },
    },
  },
  metadata: { department: "engineering" },
  company: "Tech Corp",
  network: "sei-testnet",
});

// Sign a contract
const signedContract = await sdk.contracts.signContract({
  contractId: "contract-id",
  signature: "0x...",
  expiresAt: Math.floor(Date.now() / 1000) + 3600,
});
```

### Analytics

```typescript
// Get analytics dashboard
const analytics = await sdk.analytics.getAnalytics();

// Get activities
const activities = await sdk.analytics.getActivities();

// Get activities for specific item
const itemActivities = await sdk.analytics.getActivitiesFor("item-id");
```

### Product Management

```typescript
// Create a product
const images = [
  { file: new File(["..."], "product1.jpg"), caption: "Main view" },
  { file: new File(["..."], "product2.jpg"), caption: "Side view" },
];

const product = await sdk.products.createProduct(
  {
    name: "Digital Asset",
    description: "Premium digital content",
    availableInStock: 100,
    isFeatured: true,
    isOnSale: false,
    amount: {
      amount: "25.00",
      token: {
        /* token details */
      },
    },
    network: "sei-testnet",
  },
  images
);

// Get products
const products = await sdk.products.getProducts();
```

## Error Handling

The SDK provides comprehensive error handling:

```typescript
try {
  const result = await sdk.paymentLinks.createPaymentLink(params);
} catch (error) {
  if (error.code === "HTTP_400") {
    console.log("Bad request:", error.message);
  } else if (error.code === "NETWORK_ERROR") {
    console.log("Network issue:", error.message);
  } else {
    console.log("Unknown error:", error.message);
  }
}
```

## API Reference

### SDK Configuration

```typescript
interface SDKConfig {
  apiUrl: string; // Required: API base URL
  token?: string; // Optional: Authentication token
}
```

### Modules

- **auth**: Authentication and authorization
- **accounts**: Account management
- **paymentLinks**: Payment link operations
- **files**: File upload and management
- **contracts**: Smart contract operations
- **analytics**: Analytics and reporting
- **products**: Product and checkout management

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the project
npm run build

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.
