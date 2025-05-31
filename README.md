# Paystack TypeScript SDK

A modern, type-safe TypeScript SDK for the Paystack API. This SDK is automatically generated from Paystack's official OpenAPI specification and provides full type safety for all API endpoints.

[![CI](https://github.com/roarexclamation/paystack-ts-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/roarexclamation/paystack-ts-sdk/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@roarexclamation%2Fpaystack-ts-sdk.svg)](https://badge.fury.io/js/@roarexclamation%2Fpaystack-ts-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- 🔒 **Type Safe**: Full TypeScript support with auto-generated types
- 🚀 **Modern**: Built with ES6+ and modern Node.js practices
- 📡 **Complete**: Covers all Paystack API endpoints
- 🔄 **Auto-Updated**: Weekly automatic updates from Paystack's OpenAPI spec
- 🛠 **Developer Friendly**: Comprehensive documentation and examples
- ⚡ **Lightweight**: No dependencies and optimized bundle size

## Installation

```bash
npm install @roarexclamation/paystack-ts-sdk
```

## Quick Start

```typescript
import { PaystackSDK } from "@roarexclamation/paystack-ts-sdk";

// Initialize the SDK
const paystack = new PaystackSDK({
  secretKey: "sk_test_your_secret_key_here",
});

// Initialize a transaction
async function createTransaction() {
  try {
    const transaction = await paystack.transactions.initialize({
      email: "customer@example.com",
      amount: 50000, // Amount in kobo (500 NGN)
      currency: "NGN",
    });

    console.log("Payment URL:", transaction.data.authorization_url);
    console.log("Reference:", transaction.data.reference);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## Configuration

```typescript
const paystack = new PaystackSDK({
  secretKey: "sk_test_your_secret_key_here", // Required: Your Paystack secret key
  baseURL: "https://api.paystack.co", // Optional: Custom base URL
  timeout: 30000, // Optional: Request timeout in ms
});
```

## API Reference

The SDK provides access to all Paystack API endpoints through organized client instances:

### Transactions

```typescript
// Initialize a payment
const transaction = await paystack.transactions.initialize({
  email: "user@example.com",
  amount: 50000,
  callback_url: "https://yoursite.com/callback",
});

// Verify a payment
const verification = await paystack.transactions.verify({
  reference: "transaction_reference",
});

// List transactions
const transactions = await paystack.transactions.list({
  perPage: 50,
  page: 1,
});
```

### Customers

```typescript
// Create a customer
const customer = await paystack.customers.create({
  email: "customer@example.com",
  first_name: "John",
  last_name: "Doe",
  phone: "+2348123456789",
});

// Fetch customer
const customerData = await paystack.customers.fetch({
  code: "CUS_customer_code",
});

// List customers
const customers = await paystack.customers.list();
```

### Plans

```typescript
// Create a plan
const plan = await paystack.plans.create({
  name: "Monthly Plan",
  interval: "monthly",
  amount: 500000, // 5000 NGN in kobo
});

// List plans
const plans = await paystack.plans.list();
```

### Subscriptions

```typescript
// Create subscription
const subscription = await paystack.subscriptions.create({
  customer: "CUS_customer_code",
  plan: "PLN_plan_code",
});

// List subscriptions
const subscriptions = await paystack.subscriptions.list();
```

### Other Available APIs

- `paystack.products` - Product management
- `paystack.pages` - Payment pages
- `paystack.splits` - Transaction splits
- `paystack.subaccounts` - Subaccount management
- `paystack.transfers` - Transfer funds
- `paystack.transferRecipients` - Transfer recipients
- `paystack.refunds` - Refund management
- `paystack.charges` - Direct charges
- `paystack.bulkCharges` - Bulk charging
- `paystack.balance` - Account balance
- `paystack.settlements` - Settlement data
- `paystack.disputes` - Dispute management
- `paystack.verification` - Identity verification
- `paystack.integration` - Integration settings
- `paystack.paymentRequests` - Payment requests
- `paystack.dedicatedAccounts` - Virtual accounts

## Utilities

The SDK includes helpful utility functions:

```typescript
import {
  nairaToKobo,
  koboToNaira,
  formatAmount,
  isValidEmail,
  generateReference,
  PaystackStatus,
  PaystackCurrency,
} from "@roarexclamation/paystack-ts-sdk";

// Currency conversion
const amountInKobo = nairaToKobo(500); // 50000
const amountInNaira = koboToNaira(50000); // 500

// Format amount for display
const formatted = formatAmount(50000); // "₦500.00"

// Email validation
const isValid = isValidEmail("user@example.com"); // true

// Generate unique reference
const reference = generateReference("payment"); // "payment_1622547830000_abc123"

// Use constants
if (transaction.status === PaystackStatus.SUCCESS) {
  console.log("Payment successful!");
}
```

## Error Handling

```typescript
import { PaystackSDK } from "@roarexclamation/paystack-ts-sdk";

const paystack = new PaystackSDK({ secretKey: "sk_test_..." });

try {
  const transaction = await paystack.transactions.initialize({
    email: "user@example.com",
    amount: 50000,
  });
} catch (error) {
  if (error.response) {
    // Paystack API error
    console.error("Paystack Error:", error.response.data);
    console.error("Status Code:", error.response.status);
  } else if (error.request) {
    // Network error
    console.error("Network Error:", error.request);
  } else {
    // Other error
    console.error("Error:", error.message);
  }
}
```

## TypeScript Support

This SDK is built with TypeScript and provides full type safety:

```typescript
import {
  PaystackSDK,
  TransactionInitializeRequest,
  TransactionVerifyResponse,
} from "@roarexclamation/paystack-ts-sdk";

const paystack = new PaystackSDK({ secretKey: "sk_test_..." });

// Fully typed request
const request: TransactionInitializeRequest = {
  email: "user@example.com",
  amount: 50000,
  currency: "NGN",
};

// Fully typed response
const response: TransactionVerifyResponse = await paystack.transactions.verify({
  reference: "ref_123",
});
```

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/roarexclamation/paystack-ts-sdk.git
cd paystack-ts-sdk

# Install dependencies
npm install

# Generate the SDK from OpenAPI spec
npm run generate

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Automatic Updates

This SDK is automatically updated weekly to stay in sync with Paystack's official OpenAPI specification. The GitHub Action:

1. Checks for changes in Paystack's OpenAPI spec every Sunday
2. Regenerates the SDK if changes are detected
3. Runs all tests to ensure compatibility
4. Creates a new release and publishes to NPM

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Official Paystack Documentation](https://paystack.com/docs)
- 🐛 [Report Issues](https://github.com/roarexclamation/paystack-ts-sdk/issues)
- 💬 [Discussions](https://github.com/roarexclamation/paystack-ts-sdk/discussions)

## Disclaimer

This is an unofficial SDK. While it's generated from Paystack's official OpenAPI specification, it's not officially maintained by Paystack. For official SDKs, please check [Paystack's official documentation](https://paystack.com/docs).
