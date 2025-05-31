#!/usr/bin/env node

/**
 * Generate a dynamic index.ts file based on available APIs
 */

const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "src");
const generatedSrcPath = path.join(__dirname, "..", "generated", "src");

console.log("🔄 Generating dynamic index.ts...");

/**
 * Convert API class name to property name
 * e.g., TransactionApi -> transactions
 */
function apiClassToPropertyName(apiClassName) {
  const baseName = apiClassName.replace(/Api$/, "");
  // Convert PascalCase to camelCase
  const camelCase = baseName.charAt(0).toLowerCase() + baseName.slice(1);

  // Special cases for better naming
  const customMappings = {
    transferRecipient: "transferRecipients",
    bulkCharge: "bulkCharges",
    dedicatedVirtualAccount: "dedicatedAccounts",
    paymentRequest: "paymentRequests",
    subaccount: "subaccounts",
    balance: "balance", // singular
    verification: "verification", // singular
    integration: "integration", // singular
  };

  if (customMappings[camelCase]) {
    return customMappings[camelCase];
  }

  // Auto-pluralize common endpoints
  const shouldPluralize = [
    "transaction",
    "customer",
    "plan",
    "subscription",
    "product",
    "page",
    "split",
    "transfer",
    "refund",
    "charge",
    "settlement",
    "dispute",
  ];

  if (shouldPluralize.includes(camelCase)) {
    return camelCase + "s";
  }

  return camelCase;
}

function generateDynamicIndex() {
  // Read the APIs directory to get all available API classes
  const apisPath = path.join(generatedSrcPath, "apis");

  if (!fs.existsSync(apisPath)) {
    console.log("⚠️  APIs directory not found");
    return;
  }

  const apiFiles = fs
    .readdirSync(apisPath)
    .filter((file) => file.endsWith("Api.ts") && file !== "DefaultApi.ts")
    .map((file) => file.replace(".ts", ""))
    .sort();

  console.log(`📋 Found ${apiFiles.length} API classes:`, apiFiles);

  // Generate property mappings
  const apiMappings = apiFiles.map((apiClass) => ({
    className: apiClass,
    propertyName: apiClassToPropertyName(apiClass),
  }));

  console.log("🔧 Generated API mappings:");
  apiMappings.forEach((api) => {
    console.log(`   - ${api.propertyName}: ${api.className}`);
  });

  // Generate the dynamic index content
  const indexContent = `// This file is auto-generated. Do not edit manually.
// Generated from: ${new Date().toISOString()}

// Import everything from the generated SDK
import {
  Configuration,
  ConfigurationParameters,
  // API classes
${apiMappings.map((api) => `  ${api.className},`).join("\n")}
} from "../generated/src";

/**
 * Configuration options for the Paystack SDK
 */
export interface PaystackConfig {
  /** Your Paystack secret key */
  secretKey: string;
  /** Base URL for the Paystack API (defaults to https://api.paystack.co) */
  baseURL?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Main Paystack SDK client
 *
 * @example
 * \`\`\`typescript
 * import { PaystackSDK } from '@roarexclamation/paystack-ts-sdk';
 *
 * const paystack = new PaystackSDK({
 *   secretKey: 'sk_test_...'
 * });
 *
 * // Initialize a transaction
 * const transaction = await paystack.transactions.initialize({
 *   email: 'customer@example.com',
 *   amount: 10000 // Amount in kobo (100 NGN)
 * });
 * \`\`\`
 */
export class PaystackSDK {
  private config: Configuration;

  // API client properties (auto-generated)
${apiMappings
  .map((api) => `  public readonly ${api.propertyName}: ${api.className};`)
  .join("\n")}

  constructor(paystackConfig: PaystackConfig) {
    // Validate required configuration
    if (!paystackConfig.secretKey) {
      throw new Error("Paystack secret key is required");
    }

    if (!paystackConfig.secretKey.startsWith("sk_")) {
      throw new Error(
        'Invalid Paystack secret key format. Must start with "sk_"'
      );
    }

    // Setup configuration
    const configParams: ConfigurationParameters = {
      basePath: paystackConfig.baseURL || "https://api.paystack.co",
      accessToken: paystackConfig.secretKey,
    };

    this.config = new Configuration(configParams);

    // Initialize API clients (auto-generated)
${apiMappings
  .map(
    (api) => `    this.${api.propertyName} = new ${api.className}(this.config);`
  )
  .join("\n")}
  }

  /**
   * Get the current configuration
   */
  public getConfig(): Configuration {
    return this.config;
  }
}

// Re-export commonly used types and interfaces
export * from "../generated/src/models";
export {
${apiMappings.map((api) => `  ${api.className},`).join("\n")}
  Configuration,
  ConfigurationParameters,
} from "../generated/src";
`;

  // Write the generated index file
  const indexPath = path.join(srcPath, "index.ts");
  fs.writeFileSync(indexPath, indexContent);

  console.log("✅ Generated dynamic index.ts");
}

// Run the generator
try {
  generateDynamicIndex();
  console.log("🎉 Dynamic index generation completed!");
} catch (error) {
  console.error("❌ Error generating dynamic index:", error);
  process.exit(1);
}
