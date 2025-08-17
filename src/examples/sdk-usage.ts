import { createSeiMoneySDK } from "../sdk";
import type { CreatePaymentLink } from "../sdk/types";
import type { WalletClient } from "viem";

// Example usage of the Payment Gateway SDK
async function exampleUsage() {
  // Initialize the SDK
  const sdk = createSeiMoneySDK({
    apiUrl: import.meta.env.VITE_API_URL,
    token: "your-auth-token", // Optional: can be set later
  });

  try {
    // Example: Create an account
    const newAccount = await sdk.accounts.createAccount({
      owner: "0x1234567890123456789012345678901234567890",
      name: "John Doe",
      emailAddress: "john@example.com",
      avatarURL: "https://example.com/avatar.jpg",
    });

    console.log("Account created:", newAccount);

    const { token } = await sdk.auth.authorize({
      owner: "0x1234567890123456789012345678901234567890",
      signature: "0x1234...", // message `AUTHORATION:${expiresAt}`
      expiresAt: Date.now() + 60_000,
    });

    sdk.setToken(token);

    // Example: Create a payment link
    const paymentLinkData: CreatePaymentLink = {
      description: "Payment for service",
      amount: {
        amount: "100.00",
        token: {
          name: "USDC",
          icon: "https://example.com/usdc.png",
          address: "0xA0b86a33E6441B63563F7eC2aB5f18b4a4D5e8E9",
          symbol: "USDC",
          decimals: 6,
          assetVersion: "2",
          priceUSD: 1.0,
        },
      },
      attributes: {
        service: "consultation",
        duration: "1 hour",
      },
      oneTime: true,
      network: "sei-testnet",
    };

    const paymentLink = await sdk.paymentLinks.createPaymentLink(
      paymentLinkData
    );
    console.log("Payment link created:", paymentLink);

    // Example: Get analytics
    const analytics = await sdk.analytics.getAnalytics();
    console.log("Analytics data:", analytics);

    // Example: Upload a file
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];

      const gatedFile = await sdk.files.uploadFile(
        {
          name: "Premium Content",
          description: "Exclusive content for subscribers",
          previewURL: null,
          metadata: {
            category: "premium",
            contentType: "pdf",
          },
          amount: {
            amount: "10.00",
            token: {
              name: "USDC",
              icon: "https://example.com/usdc.png",
              address: "0xA0b86a33E6441B63563F7eC2aB5f18b4a4D5e8E9",
              symbol: "USDC",
              decimals: 6,
              assetVersion: "2",
              priceUSD: 1.0,
            },
          },
          network: "sei-testnet",
        },
        file
      );

      console.log("File uploaded:", gatedFile);
    }
  } catch (error) {
    console.error("SDK Error:", error);
  }
}

// Example with wallet integration
async function exampleWithWallet(walletClient: WalletClient) {
  const sdk = createSeiMoneySDK({
    apiUrl: import.meta.env.VITE_API_URL,
  });

  // Update wallet client for payment processing
  sdk.updateWalletClient(walletClient);

  try {
    // Authorize with wallet signature
    const transactionRef = await sdk.paymentLinks.fulfillPaymentLink({
      paymentId: "payment-link-id",
    });

    console.log("Payment processed successfully:", transactionRef);
  } catch (error) {
    console.error("Payment failed:", error);
  }
}

export { exampleUsage, exampleWithWallet };
