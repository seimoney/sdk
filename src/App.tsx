import {
  Wallet,
  CreditCard,
  FileText,
  BarChart3,
  Package,
  Shield,
} from "lucide-react";

function App() {
  const features = [
    {
      id: "auth",
      name: "Authentication",
      icon: Shield,
      description:
        "Secure wallet-based authentication with signature verification",
      color: "bg-blue-500",
    },
    {
      id: "payments",
      name: "Payment Links",
      icon: CreditCard,
      description: "Create and manage payment links with ERC20 token support",
      color: "bg-green-500",
    },
    {
      id: "files",
      name: "Gated Files",
      icon: FileText,
      description: "Upload and monetize digital content with payment gates",
      color: "bg-purple-500",
    },
    {
      id: "contracts",
      name: "Smart Contracts",
      icon: FileText,
      description:
        "Create and manage employment contracts with automated payroll",
      color: "bg-orange-500",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      description: "Comprehensive analytics and activity tracking",
      color: "bg-red-500",
    },
    {
      id: "products",
      name: "Checkout",
      icon: Package,
      description: "E-commerce functionality with product management",
      color: "bg-teal-500",
    },
  ];

  const codeExample = `import { createSeiMoneySDK } from './sdk';

// Initialize the SDK
const sdk = createSeiMoneySDK({
  apiUrl: 'https://api.seimoney.link',
  token: 'your-auth-token'
});

// Create a payment link
const paymentLink = await sdk.paymentLinks.createPaymentLink({
  description: 'Service payment',
  amount: {
    amount: '100.00',
    token: {
      name: 'USDC',
      symbol: 'USDC',
      address: '0x...',
      decimals: 6
    }
  },
  oneTime: true,
  network: 'sei-testnet'
});`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Payment Gateway SDK
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                v1.5.3
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Sei Money Typescript SDK
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive TypeScript SDK for blockchain payments, file
            monetization, smart contracts, and e-commerce functionality with
            seamless wallet integration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center mr-3`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-800 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">
              Quick Start Example
            </h3>
          </div>
          <div className="p-6">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Key Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Type Safe</h4>
              <p className="text-slate-600 text-sm">
                Full TypeScript support with comprehensive type definitions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Wallet Ready
              </h4>
              <p className="text-slate-600 text-sm">
                Seamless integration with Web3 wallets using Viem
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Modular</h4>
              <p className="text-slate-600 text-sm">
                Clean architecture with dedicated modules for each feature
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Production Ready
              </h4>
              <p className="text-slate-600 text-sm">
                Robust error handling and comprehensive testing
              </p>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Installation
          </h3>
          <div className="bg-slate-900 rounded-lg p-4">
            <code className="text-green-400">npm install @seimoney/sdk</code>
          </div>
          <p className="text-slate-600 mt-4">
            Check out the{" "}
            <span className="font-mono bg-slate-100 px-2 py-1 rounded">
              README.md
            </span>{" "}
            file for comprehensive documentation and usage examples.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            Payment Gateway SDK - Built with TypeScript, React, and Web3
            technologies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
