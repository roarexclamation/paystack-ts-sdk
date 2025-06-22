#!/usr/bin/env node

/**
 * Generate dynamic API documentation from OpenAPI generated docs
 * and incorporate it into the README.md file
 */

const fs = require("fs");
const path = require("path");

const docsPath = path.join(__dirname, "..", "docs");
const readmePath = path.join(__dirname, "..", "README.md");
const generatedSrcPath = path.join(__dirname, "..", "generated", "src");

console.log("🔄 Generating dynamic API documentation...");

/**
 * Parse OpenAPI generated HTML docs to extract API information
 */
function parseApiDocs() {
  const indexHtmlPath = path.join(docsPath, "index.html");

  if (!fs.existsSync(indexHtmlPath)) {
    console.log("⚠️  Generated docs not found, skipping documentation update");
    return null;
  }

  try {
    const htmlContent = fs.readFileSync(indexHtmlPath, "utf8");

    // Extract API endpoints and their descriptions from the HTML
    const apis = extractApiEndpoints(htmlContent);

    console.log(`📋 Found ${apis.length} API endpoints from HTML docs`);
    return apis;
  } catch (error) {
    console.error("❌ Error parsing HTML docs:", error);
    return null;
  }
}

/**
 * Extract API endpoints from HTML content
 */
function extractApiEndpoints(htmlContent) {
  const apis = [];

  // Simple regex patterns to extract endpoint information
  // This is a basic implementation - you might want to use a proper HTML parser
  const operationRegex =
    /<h3[^>]*>([^<]+)<\/h3>[\s\S]*?<div[^>]*class[^>]*operation[^>]*>[\s\S]*?<span[^>]*class[^>]*method[^>]*>([^<]+)<\/span>[\s\S]*?<span[^>]*class[^>]*url[^>]*>([^<]+)<\/span>/g;

  let match;
  while ((match = operationRegex.exec(htmlContent)) !== null) {
    const [, title, method, endpoint] = match;
    apis.push({
      title: title.trim(),
      method: method.trim().toUpperCase(),
      endpoint: endpoint.trim(),
    });
  }

  return apis;
}

/**
 * Group APIs by resource type
 */
function groupApisByResource(apis) {
  const grouped = {};

  apis.forEach((api) => {
    // Extract resource name from endpoint (e.g., /transaction -> transactions)
    const pathParts = api.endpoint
      .split("/")
      .filter((part) => part && !part.startsWith("{"));
    const resource = pathParts[0] || "misc";

    if (!grouped[resource]) {
      grouped[resource] = [];
    }

    grouped[resource].push(api);
  });

  return grouped;
}

/**
 * Generate documentation sections for each API resource
 */
function generateApiDocumentation(groupedApis) {
  let documentation = "";

  // Sort resources alphabetically
  const sortedResources = Object.keys(groupedApis).sort();

  sortedResources.forEach((resource) => {
    const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1);
    const apis = groupedApis[resource];

    documentation += `### ${resourceName}\n\n`;

    // Group by method for better organization
    const methodGroups = {};
    apis.forEach((api) => {
      if (!methodGroups[api.method]) {
        methodGroups[api.method] = [];
      }
      methodGroups[api.method].push(api);
    });

    // Generate examples for common operations
    if (resource === "transaction") {
      documentation += generateTransactionExamples();
    } else if (resource === "customer") {
      documentation += generateCustomerExamples();
    } else if (resource === "plan") {
      documentation += generatePlanExamples();
    } else if (resource === "balance") {
      documentation += generateBalanceExamples();
    } else if (resource === "charge") {
      documentation += generateChargeExamples();
    } else if (resource === "transfer") {
      documentation += generateTransferExamples();
    } else if (resource === "refund") {
      documentation += generateRefundExamples();
    } else {
      documentation += generateGenericExamples(resource, apis);
    }

    documentation += "\n";
  });

  return documentation;
}

/**
 * Generate specific examples for transactions
 */
function generateTransactionExamples() {
  return `\`\`\`typescript
// Initialize a payment
const transaction = await paystack.transactions.initialize({
  email: "user@example.com",
  amount: 50000, // Amount in kobo (500 NGN)
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

// Get transaction timeline
const timeline = await paystack.transactions.timeline({
  id: "transaction_id",
});
\`\`\`

`;
}

/**
 * Generate specific examples for customers
 */
function generateCustomerExamples() {
  return `\`\`\`typescript
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

// Update customer
const updatedCustomer = await paystack.customers.update({
  code: "CUS_customer_code",
  first_name: "Jane",
});

// List customers
const customers = await paystack.customers.list();
\`\`\`

`;
}

/**
 * Generate specific examples for plans
 */
function generatePlanExamples() {
  return `\`\`\`typescript
// Create a plan
const plan = await paystack.plans.create({
  name: "Monthly Plan",
  interval: "monthly",
  amount: 500000, // 5000 NGN in kobo
});

// Fetch a plan
const planData = await paystack.plans.fetch({
  code: "PLN_plan_code",
});

// Update a plan
const updatedPlan = await paystack.plans.update({
  code: "PLN_plan_code",
  name: "Updated Monthly Plan",
});

// List plans
const plans = await paystack.plans.list();
\`\`\`

`;
}

/**
 * Generate specific examples for balance
 */
function generateBalanceExamples() {
  return `\`\`\`typescript
// Fetch account balance
const balance = await paystack.balance.balanceFetch();

// Get balance ledger
const ledger = await paystack.balance.balanceLedger({
  perPage: 50,
  page: 1,
});
\`\`\`

`;
}

/**
 * Generate specific examples for charges
 */
function generateChargeExamples() {
  return `\`\`\`typescript
// Create a charge
const charge = await paystack.charge.chargeCreate({
  email: "customer@example.com",
  amount: 50000, // Amount in kobo
});

// Submit PIN for charge
const submitPin = await paystack.charge.chargeSubmitPin({
  pin: "1234",
  reference: "charge_reference",
});

// Submit OTP for charge
const submitOtp = await paystack.charge.chargeSubmitOtp({
  otp: "123456",
  reference: "charge_reference",
});
\`\`\`

`;
}

/**
 * Generate specific examples for transfers
 */
function generateTransferExamples() {
  return `\`\`\`typescript
// Initiate a transfer
const transfer = await paystack.transfer.transferCreate({
  source: "balance",
  amount: 50000,
  recipient: "RCP_recipient_code",
  reason: "Transfer payment",
});

// Finalize transfer
const finalizeTransfer = await paystack.transfer.transferFinalize({
  transfer_code: "TRF_transfer_code",
  otp: "123456",
});

// List transfers
const transfers = await paystack.transfer.transferList();
\`\`\`

`;
}

/**
 * Generate specific examples for refunds
 */
function generateRefundExamples() {
  return `\`\`\`typescript
// Create a refund
const refund = await paystack.refund.refundCreate({
  transaction: "transaction_id",
  amount: 25000, // Partial refund amount in kobo
});

// List refunds
const refunds = await paystack.refund.refundList();

// Fetch refund details
const refundDetails = await paystack.refund.refundFetch({
  id: "refund_id",
});
\`\`\`

`;
}

/**
 * Generate generic examples for other resources
 */
function generateGenericExamples(resource, apis, methods = []) {
  let example = `\`\`\`typescript\n`;

  // Use methods from TypeScript parsing if available
  const availableMethods = methods.length > 0 ? methods : apis;

  if (availableMethods.length > 0) {
    // Generate examples based on common method patterns
    const createMethod = availableMethods.find(
      (m) =>
        m.name &&
        (m.name.toLowerCase().includes("create") ||
          (m.name.toLowerCase().includes(resource) &&
            !m.name.toLowerCase().includes("list") &&
            !m.name.toLowerCase().includes("fetch")))
    );

    const fetchMethod = availableMethods.find(
      (m) =>
        m.name &&
        (m.name.toLowerCase().includes("fetch") ||
          m.name.toLowerCase().includes("get"))
    );

    const listMethod = availableMethods.find(
      (m) => m.name && m.name.toLowerCase().includes("list")
    );

    const updateMethod = availableMethods.find(
      (m) => m.name && m.name.toLowerCase().includes("update")
    );

    if (createMethod) {
      example += `// Create ${resource}\nconst new${
        resource.charAt(0).toUpperCase() + resource.slice(1)
      } = await paystack.${resource}.${
        createMethod.name
      }({\n  // Add required fields here\n});\n\n`;
    }

    if (fetchMethod) {
      example += `// Fetch ${resource}\nconst ${resource}Data = await paystack.${resource}.${fetchMethod.name}({\n  // Add identifier here\n});\n\n`;
    }

    if (updateMethod) {
      example += `// Update ${resource}\nconst updated${
        resource.charAt(0).toUpperCase() + resource.slice(1)
      } = await paystack.${resource}.${
        updateMethod.name
      }({\n  // Add fields to update\n});\n\n`;
    }

    if (listMethod) {
      example += `// List ${resource}\nconst ${resource}List = await paystack.${resource}.${listMethod.name}();\n\n`;
    }
  } else {
    // Fallback generic example
    example += `// Example usage for ${resource}\nconst result = await paystack.${resource}.someMethod({\n  // Add required parameters\n});\n\n`;
  }

  example += `\`\`\`\n\n`;

  return example;
}

/**
 * Update README.md with generated documentation
 */
function updateReadmeWithDocs(documentation) {
  if (!fs.existsSync(readmePath)) {
    console.log("⚠️  README.md not found");
    return;
  }

  let readmeContent = fs.readFileSync(readmePath, "utf8");

  // Define markers for the API documentation section
  const startMarker = "<!-- API_DOCS_START -->";
  const endMarker = "<!-- API_DOCS_END -->";

  // Check if markers exist
  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.log("⚠️  API documentation markers not found in README.md");
    console.log("Adding markers to the API Reference section...");

    // Try to find the API Reference section and add markers
    const apiRefIndex = readmeContent.indexOf("## API Reference");
    if (apiRefIndex !== -1) {
      // Find the end of the API Reference section (next ## or end of file)
      const nextSectionIndex = readmeContent.indexOf("\n## ", apiRefIndex + 1);
      const insertIndex =
        nextSectionIndex !== -1 ? nextSectionIndex : readmeContent.length;

      const newContent = `\n\n${startMarker}\n${documentation}\n${endMarker}\n`;
      readmeContent =
        readmeContent.slice(0, insertIndex) +
        newContent +
        readmeContent.slice(insertIndex);
    } else {
      console.log("⚠️  Could not find API Reference section in README.md");
      return;
    }
  } else {
    // Replace content between markers
    const beforeMarker = readmeContent.slice(
      0,
      startIndex + startMarker.length
    );
    const afterMarker = readmeContent.slice(endIndex);
    readmeContent = beforeMarker + "\n" + documentation + "\n" + afterMarker;
  }

  // Write updated README
  fs.writeFileSync(readmePath, readmeContent);
  console.log("✅ Updated README.md with API documentation");
}

/**
 * Alternative approach: Extract from generated TypeScript APIs
 */
function extractFromGeneratedApis() {
  const apisPath = path.join(generatedSrcPath, "apis");

  if (!fs.existsSync(apisPath)) {
    console.log("⚠️  Generated APIs directory not found");
    return null;
  }

  const apiFiles = fs
    .readdirSync(apisPath)
    .filter((file) => file.endsWith("Api.ts") && file !== "DefaultApi.ts");

  const apiInfo = [];

  apiFiles.forEach((file) => {
    const filePath = path.join(apisPath, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Extract method information from TypeScript files
    const className = file.replace(".ts", "");
    const methods = extractMethodsFromApiFile(content);

    apiInfo.push({
      className,
      methods,
      resourceName: className.replace("Api", "").toLowerCase(),
    });
  });

  return apiInfo;
}

/**
 * Extract method signatures from API TypeScript files
 */
function extractMethodsFromApiFile(content) {
  const methods = [];

  // Regex to match async method signatures (both public and without explicit public keyword)
  const methodRegex = /async\s+(\w+)\s*\([^)]*\):\s*Promise<([^>]+)>/g;

  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    const [, methodName, returnType] = match;
    // Skip methods ending with "Raw" as they are internal
    if (!methodName.endsWith("Raw")) {
      methods.push({
        name: methodName,
        returnType: returnType.trim(),
      });
    }
  }

  return methods;
}

/**
 * Generate documentation from TypeScript API files
 */
function generateDocsFromTypeScript() {
  const apiInfo = extractFromGeneratedApis();

  if (!apiInfo || apiInfo.length === 0) {
    console.log("⚠️  No API information extracted from generated files");
    return "";
  }

  console.log(`📋 Found ${apiInfo.length} API classes from TypeScript files`);

  let documentation = "";

  apiInfo.forEach((api) => {
    const resourceName = api.resourceName;
    const displayName =
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

    documentation += `### ${displayName}\n\n`;

    // Add common examples based on resource type
    if (resourceName === "transaction") {
      documentation += generateTransactionExamples();
    } else if (resourceName === "customer") {
      documentation += generateCustomerExamples();
    } else if (resourceName === "plan") {
      documentation += generatePlanExamples();
    } else if (resourceName === "balance") {
      documentation += generateBalanceExamples();
    } else if (resourceName === "charge") {
      documentation += generateChargeExamples();
    } else if (resourceName === "transfer") {
      documentation += generateTransferExamples();
    } else if (resourceName === "refund") {
      documentation += generateRefundExamples();
    } else {
      documentation += generateGenericExamples(resourceName, [], api.methods);
    }

    // List available methods
    if (api.methods.length > 0) {
      documentation += `**Available methods:**\n`;
      api.methods.forEach((method) => {
        documentation += `- \`${method.name}()\` - Returns ${method.returnType}\n`;
      });
      documentation += "\n";
    }
  });

  return documentation;
}

/**
 * Main function
 */
function generateDynamicDocs() {
  try {
    // Try to parse from HTML docs first
    let documentation = "";
    const apis = parseApiDocs();

    if (apis && apis.length > 0) {
      const groupedApis = groupApisByResource(apis);
      documentation = generateApiDocumentation(groupedApis);
    } else {
      // Fallback to TypeScript file parsing
      console.log("📝 Falling back to TypeScript API analysis...");
      documentation = generateDocsFromTypeScript();
    }

    if (documentation) {
      updateReadmeWithDocs(documentation);
    } else {
      console.log("⚠️  No documentation generated");
    }
  } catch (error) {
    console.error("❌ Error generating dynamic docs:", error);
    process.exit(1);
  }
}

// Run the generator
console.log("🔄 Starting dynamic documentation generation...");
generateDynamicDocs();
console.log("🎉 Dynamic documentation generation completed!");
