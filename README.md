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

<!-- API_DOCS_START -->
### Applepay

```typescript
// Create applepay
const newApplepay = await paystack.applepay.applePayRegisterDomain({
  // Add required fields here
});

// List applepay
const applepayList = await paystack.applepay.applePayListDomain();

```

**Available methods:**
- `applePayListDomain()` - Returns Response
- `applePayRegisterDomain()` - Returns ApplePayCreateOkModel
- `applePayUnregisterDomain()` - Returns Response

### Balance

```typescript
// Fetch account balance
const balance = await paystack.balance.balanceFetch();

// Get balance ledger
const ledger = await paystack.balance.balanceLedger({
  perPage: 50,
  page: 1,
});
```

**Available methods:**
- `balanceFetch()` - Returns BalanceCheckResponse
- `balanceLedger()` - Returns BalanceFetchLedgerResponse

### Bank

```typescript
// Create bank
const newBank = await paystack.bank.bankResolveAccountNumber({
  // Add required fields here
});

// List bank
const bankList = await paystack.bank.bankList();

```

**Available methods:**
- `bankList()` - Returns MiscellaneousListBanksResponse
- `bankResolveAccountNumber()` - Returns VerificationResolveAccountNumberResponse
- `bankValidateAccountNumber()` - Returns VerificationValidateAccountResponse

### Bulkcharge

```typescript
// Create bulkcharge
const newBulkcharge = await paystack.bulkcharge.bulkChargeCharges({
  // Add required fields here
});

// Fetch bulkcharge
const bulkchargeData = await paystack.bulkcharge.bulkChargeFetch({
  // Add identifier here
});

// List bulkcharge
const bulkchargeList = await paystack.bulkcharge.bulkChargeList();

```

**Available methods:**
- `bulkChargeCharges()` - Returns BulkchargeCodeCharges
- `bulkChargeFetch()` - Returns BulkchargeCode
- `bulkChargeInitiate()` - Returns BulkChargeInitiateResponse
- `bulkChargeList()` - Returns BulkChargeListResponse
- `bulkChargePause()` - Returns BulkchargePauseCode
- `bulkChargeResume()` - Returns BulkchargeResumeCode

### Charge

```typescript
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
```

**Available methods:**
- `chargeCheck()` - Returns ChargeReference
- `chargeCreate()` - Returns ChargeCreateResponse
- `chargeSubmitAddress()` - Returns Response
- `chargeSubmitBirthday()` - Returns ChargeSubmitBirthdayResponse
- `chargeSubmitOtp()` - Returns ChargeSubmitOtpResponse
- `chargeSubmitPhone()` - Returns ChargeSubmitPhoneResponse
- `chargeSubmitPin()` - Returns ChargeSubmitPinResponse

### Customer

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

// Update customer
const updatedCustomer = await paystack.customers.update({
  code: "CUS_customer_code",
  first_name: "Jane",
});

// List customers
const customers = await paystack.customers.list();
```

**Available methods:**
- `customerCreate()` - Returns CustomerCreateResponse
- `customerDeactivateAuthorization()` - Returns CustomerDeactivateAuthorizationResponse
- `customerDirectDebitActivationCharge()` - Returns CustomerDirectDebitActivationChargeResponse
- `customerFetch()` - Returns CustomerCode
- `customerFetchMandateAuthorizations()` - Returns CustomerFetchMandateAuthorizationsResponse
- `customerInitializeAuthorization()` - Returns CustomerAuthorizationInitializeResponse
- `customerInitializeDirectDebit()` - Returns CustomerInitializeDirectDebitResponse
- `customerList()` - Returns CustomerListResponse
- `customerRiskAction()` - Returns CustomerWhitelistBlacklistResponse
- `customerUpdate()` - Returns CustomerCode
- `customerValidate()` - Returns CustomerCodeIdentification
- `customerVerifyAuthorization()` - Returns CustomerAuthorizationVerifyResponse

### Dedicatedvirtualaccount

```typescript
// Create dedicatedvirtualaccount
const newDedicatedvirtualaccount = await paystack.dedicatedvirtualaccount.dedicatedAccountCreate({
  // Add required fields here
});

// Fetch dedicatedvirtualaccount
const dedicatedvirtualaccountData = await paystack.dedicatedvirtualaccount.dedicatedAccountFetch({
  // Add identifier here
});

// List dedicatedvirtualaccount
const dedicatedvirtualaccountList = await paystack.dedicatedvirtualaccount.dedicatedAccountList();

```

**Available methods:**
- `dedicatedAccountAddSplit()` - Returns Response
- `dedicatedAccountAssign()` - Returns Response
- `dedicatedAccountAvailableProviders()` - Returns Response
- `dedicatedAccountCreate()` - Returns DedicatedNubanCreateResponse
- `dedicatedAccountDeactivate()` - Returns DedicatedAccountId
- `dedicatedAccountFetch()` - Returns DedicatedAccountId
- `dedicatedAccountList()` - Returns DedicatedNubanListResponse
- `dedicatedAccountRemoveSplit()` - Returns Response
- `dedicatedAccountRequery()` - Returns Response

### Directdebit

```typescript
// Create directdebit
const newDirectdebit = await paystack.directdebit.directdebitTriggerActivationCharge({
  // Add required fields here
});

// List directdebit
const directdebitList = await paystack.directdebit.directdebitListMandateAuthorizations();

```

**Available methods:**
- `directdebitListMandateAuthorizations()` - Returns CustomerFetchMandateAuthorizationsResponse
- `directdebitTriggerActivationCharge()` - Returns DirectDebitActivationChargeResponse

### Dispute

```typescript
// Create dispute
const newDispute = await paystack.dispute.disputeDownload({
  // Add required fields here
});

// Fetch dispute
const disputeData = await paystack.dispute.disputeFetch({
  // Add identifier here
});

// Update dispute
const updatedDispute = await paystack.dispute.disputeUpdate({
  // Add fields to update
});

// List dispute
const disputeList = await paystack.dispute.disputeList();

```

**Available methods:**
- `disputeDownload()` - Returns DisputeExportResponse
- `disputeEvidence()` - Returns DisputeAddEvidenceResponse
- `disputeFetch()` - Returns DisputeFetchResponse
- `disputeList()` - Returns DisputeListResponse
- `disputeResolve()` - Returns DisputeResolveResponse
- `disputeTransaction()` - Returns DisputeListTransactionResponse
- `disputeUpdate()` - Returns DisputeUpdateResponse
- `disputeUploadUrl()` - Returns DisputeUploadURLResponse

### Integration

```typescript
// Create integration
const newIntegration = await paystack.integration.integrationUpdatePaymentSessionTimeout({
  // Add required fields here
});

// Fetch integration
const integrationData = await paystack.integration.integrationFetchPaymentSessionTimeout({
  // Add identifier here
});

// Update integration
const updatedIntegration = await paystack.integration.integrationUpdatePaymentSessionTimeout({
  // Add fields to update
});

```

**Available methods:**
- `integrationFetchPaymentSessionTimeout()` - Returns ControlPanelFetchPaymentSessionTimeoutResponse
- `integrationUpdatePaymentSessionTimeout()` - Returns ControlPanelUpdatePaymentSessionTimeoutResponse

### Miscellaneous

```typescript
// Create miscellaneous
const newMiscellaneous = await paystack.miscellaneous.miscellaneousAvs({
  // Add required fields here
});

// List miscellaneous
const miscellaneousList = await paystack.miscellaneous.miscellaneousListCountries();

```

**Available methods:**
- `miscellaneousAvs()` - Returns MiscellaneousListStatesResponse
- `miscellaneousListCountries()` - Returns MiscellaneousListCountriesResponse
- `miscellaneousResolveCardBin()` - Returns VerificationResolveCardBINResponse

### Order

```typescript
// Create order
const newOrder = await paystack.order.orderCreate({
  // Add required fields here
});

// Fetch order
const orderData = await paystack.order.orderFetch({
  // Add identifier here
});

// List order
const orderList = await paystack.order.orderList();

```

**Available methods:**
- `orderCreate()` - Returns OrderCreateResponse
- `orderFetch()` - Returns OrderFetchResponse
- `orderFetchProducts()` - Returns OrderFetchProductResponse
- `orderList()` - Returns OrderListResponse
- `orderValidatePayForMe()` - Returns OrderValidateResponse

### Page

```typescript
// Create page
const newPage = await paystack.page.pageAddProducts({
  // Add required fields here
});

// Fetch page
const pageData = await paystack.page.pageFetch({
  // Add identifier here
});

// Update page
const updatedPage = await paystack.page.pageUpdate({
  // Add fields to update
});

// List page
const pageList = await paystack.page.pageList();

```

**Available methods:**
- `pageAddProducts()` - Returns PageAddProductsResponse
- `pageCheckSlugAvailability()` - Returns PageCheckSlugAvailabilityResponse
- `pageCreate()` - Returns PageCreateResponse
- `pageFetch()` - Returns PageFetchResponse
- `pageList()` - Returns PageListResponse
- `pageUpdate()` - Returns PageUpdateResponse

### Paymentrequest

```typescript
// Create paymentrequest
const newPaymentrequest = await paystack.paymentrequest.paymentRequestArchive({
  // Add required fields here
});

// Fetch paymentrequest
const paymentrequestData = await paystack.paymentrequest.paymentRequestFetch({
  // Add identifier here
});

// Update paymentrequest
const updatedPaymentrequest = await paystack.paymentrequest.paymentRequestUpdate({
  // Add fields to update
});

// List paymentrequest
const paymentrequestList = await paystack.paymentrequest.paymentRequestList();

```

**Available methods:**
- `paymentRequestArchive()` - Returns PaymentRequestArchiveResponse
- `paymentRequestCreate()` - Returns PaymentRequestCreateResponse
- `paymentRequestFetch()` - Returns PaymentRequestListResponse
- `paymentRequestFinalize()` - Returns PaymentRequestFinalizeResponse
- `paymentRequestList()` - Returns PaymentRequestListResponse
- `paymentRequestNotify()` - Returns PaymentRequestSendNotificationResponse
- `paymentRequestTotals()` - Returns PaymentRequestTotalResponse
- `paymentRequestUpdate()` - Returns PaymentRequestUpdateResponse
- `paymentRequestVerify()` - Returns PaymentRequestVerifyResponse

### Plan

```typescript
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
```

**Available methods:**
- `planCreate()` - Returns PlanCreateResponse
- `planFetch()` - Returns PlanFetchResponse
- `planList()` - Returns PlanListResponse
- `planUpdate()` - Returns PlanUpdateResponse

### Product

```typescript
// Create product
const newProduct = await paystack.product.productCreate({
  // Add required fields here
});

// Fetch product
const productData = await paystack.product.productFetch({
  // Add identifier here
});

// Update product
const updatedProduct = await paystack.product.productUpdate({
  // Add fields to update
});

// List product
const productList = await paystack.product.productList();

```

**Available methods:**
- `productCreate()` - Returns ProductCreateResponse
- `productDelete()` - Returns ProductDeleteResponse
- `productFetch()` - Returns ProductFetchResponse
- `productList()` - Returns ProductListsResponse
- `productUpdate()` - Returns ProductUpdateResponse

### Refund

```typescript
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
```

**Available methods:**
- `refundCreate()` - Returns RefundCreateResponse
- `refundFetch()` - Returns RefundFetchResponse
- `refundList()` - Returns RefundListResponse

### Settlement

```typescript
// Create settlement
const newSettlement = await paystack.settlement.settlementsTransaction({
  // Add required fields here
});

// Fetch settlement
const settlementData = await paystack.settlement.settlementsFetch({
  // Add identifier here
});

```

**Available methods:**
- `settlementsFetch()` - Returns Response
- `settlementsTransaction()` - Returns Response

### Split

```typescript
// Create split
const newSplit = await paystack.split.splitAddSubaccount({
  // Add required fields here
});

// Fetch split
const splitData = await paystack.split.splitFetch({
  // Add identifier here
});

// Update split
const updatedSplit = await paystack.split.splitUpdate({
  // Add fields to update
});

// List split
const splitList = await paystack.split.splitList();

```

**Available methods:**
- `splitAddSubaccount()` - Returns SplitIdSubaccountAdd
- `splitCreate()` - Returns SplitCreateResponse
- `splitFetch()` - Returns SplitId
- `splitList()` - Returns SplitListResponse
- `splitRemoveSubaccount()` - Returns SplitIdSubaccountRemove
- `splitUpdate()` - Returns SplitId

### Storefront

```typescript
// Create storefront
const newStorefront = await paystack.storefront.storefrontAddProducts({
  // Add required fields here
});

// Fetch storefront
const storefrontData = await paystack.storefront.storefrontFetch({
  // Add identifier here
});

// Update storefront
const updatedStorefront = await paystack.storefront.storefrontUpdate({
  // Add fields to update
});

// List storefront
const storefrontList = await paystack.storefront.storefrontList();

```

**Available methods:**
- `storefrontAddProducts()` - Returns Response
- `storefrontCreate()` - Returns StorefrontCreateResponse
- `storefrontDelete()` - Returns StorefrontDeleteResponse
- `storefrontDuplicate()` - Returns Response
- `storefrontFetch()` - Returns StorefrontFetchResponse
- `storefrontFetchOrders()` - Returns Response
- `storefrontList()` - Returns StorefrontListResponse
- `storefrontListProducts()` - Returns Response
- `storefrontPublish()` - Returns Response
- `storefrontUpdate()` - Returns StorefrontUpdateResponse
- `storefrontVerifySlug()` - Returns Response

### Subaccount

```typescript
// Create subaccount
const newSubaccount = await paystack.subaccount.subaccountCreate({
  // Add required fields here
});

// Fetch subaccount
const subaccountData = await paystack.subaccount.subaccountFetch({
  // Add identifier here
});

// Update subaccount
const updatedSubaccount = await paystack.subaccount.subaccountUpdate({
  // Add fields to update
});

// List subaccount
const subaccountList = await paystack.subaccount.subaccountList();

```

**Available methods:**
- `subaccountCreate()` - Returns SubaccountCreateResponse
- `subaccountFetch()` - Returns SubaccountCode
- `subaccountList()` - Returns SubaccountListResponse
- `subaccountUpdate()` - Returns SubaccountCode

### Subscription

```typescript
// Create subscription
const newSubscription = await paystack.subscription.subscriptionCreate({
  // Add required fields here
});

// Fetch subscription
const subscriptionData = await paystack.subscription.subscriptionFetch({
  // Add identifier here
});

// List subscription
const subscriptionList = await paystack.subscription.subscriptionList();

```

**Available methods:**
- `subscriptionCreate()` - Returns SubscriptionCreateResponse
- `subscriptionDisable()` - Returns SubscriptionDisableResponse
- `subscriptionEnable()` - Returns Response
- `subscriptionFetch()` - Returns SubscriptionFetchResponse
- `subscriptionList()` - Returns SubscriptionListResponse
- `subscriptionManageEmail()` - Returns Response
- `subscriptionManageLink()` - Returns Response

### Terminal

```typescript
// Create terminal
const newTerminal = await paystack.terminal.terminalCommission({
  // Add required fields here
});

// Fetch terminal
const terminalData = await paystack.terminal.terminalFetch({
  // Add identifier here
});

// Update terminal
const updatedTerminal = await paystack.terminal.terminalUpdate({
  // Add fields to update
});

// List terminal
const terminalList = await paystack.terminal.terminalList();

```

**Available methods:**
- `terminalCommission()` - Returns TerminalCommissionDeviceResponse
- `terminalDecommission()` - Returns TerminalDecommissionDeviceResponse
- `terminalFetch()` - Returns TerminalGetResponse
- `terminalFetchEventStatus()` - Returns Response
- `terminalFetchTerminalStatus()` - Returns TerminalGetStatusResponse
- `terminalList()` - Returns TerminalListsResponse
- `terminalSendEvent()` - Returns Response
- `terminalUpdate()` - Returns TerminalUpdateResponse

### Transaction

```typescript
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
```

**Available methods:**
- `transactionChargeAuthorization()` - Returns ChargeAuthorizationResponse
- `transactionExport()` - Returns TransactionExportResponse
- `transactionFetch()` - Returns TransactionId
- `transactionInitialize()` - Returns TransactionInitializeResponse
- `transactionList()` - Returns TransactionListResponse
- `transactionPartialDebit()` - Returns TransactionPartialDebitResponse
- `transactionTimeline()` - Returns TransactionTimelineId
- `transactionTotals()` - Returns TransactionTotalsResponse
- `transactionVerify()` - Returns TransactionVerifyReference

### Transfer

```typescript
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
```

**Available methods:**
- `transferBulk()` - Returns TransferBulkResponse
- `transferDisableOtp()` - Returns TransferDisablesOtpResponse
- `transferDisableOtpFinalize()` - Returns TransferFinalizeDisablesOtpResponse
- `transferEnableOtp()` - Returns TransferEnablesOtpResponse
- `transferExportTransfer()` - Returns Response
- `transferFetch()` - Returns TransferCode
- `transferFinalize()` - Returns Response
- `transferInitiate()` - Returns TransferCreateResponse
- `transferList()` - Returns TransferListResponse
- `transferResendOtp()` - Returns TransferResendsOtpResponse
- `transferVerify()` - Returns TransferVerifyReference

### Transferrecipient

```typescript
// Create transferrecipient
const newTransferrecipient = await paystack.transferrecipient.transferrecipientBulk({
  // Add required fields here
});

// Fetch transferrecipient
const transferrecipientData = await paystack.transferrecipient.transferrecipientFetch({
  // Add identifier here
});

// Update transferrecipient
const updatedTransferrecipient = await paystack.transferrecipient.transferrecipientUpdate({
  // Add fields to update
});

// List transferrecipient
const transferrecipientList = await paystack.transferrecipient.transferrecipientList();

```

**Available methods:**
- `transferrecipientBulk()` - Returns TransferRecipientBulkCreateResponse
- `transferrecipientCreate()` - Returns TransferRecipientCreateResponse
- `transferrecipientDelete()` - Returns TransferrecipientCode
- `transferrecipientFetch()` - Returns TransferrecipientCode
- `transferrecipientList()` - Returns TransferRecipientListResponse
- `transferrecipientUpdate()` - Returns TransferrecipientCode

### Virtualterminal

```typescript
// Create virtualterminal
const newVirtualterminal = await paystack.virtualterminal.virtualTerminalAddSplitCode({
  // Add required fields here
});

// Fetch virtualterminal
const virtualterminalData = await paystack.virtualterminal.virtualTerminalFetch({
  // Add identifier here
});

// Update virtualterminal
const updatedVirtualterminal = await paystack.virtualterminal.virtualTerminalUpdate({
  // Add fields to update
});

// List virtualterminal
const virtualterminalList = await paystack.virtualterminal.virtualTerminalList();

```

**Available methods:**
- `virtualTerminalAddSplitCode()` - Returns VirtualTerminalAddSplitCodeResponse
- `virtualTerminalCreate()` - Returns VirtualTerminalCreateResponse
- `virtualTerminalDeactivate()` - Returns VirtualTerminalDeactivateResponse
- `virtualTerminalDeleteSplitCode()` - Returns VirtualTerminalDeleteSplitCodeResponse
- `virtualTerminalDestinationAssign()` - Returns VirtualTerminalDestinationAssignResponse
- `virtualTerminalDestinationUnassign()` - Returns VirtualTerminalDestinationUnassignResponse
- `virtualTerminalFetch()` - Returns VirtualTerminalFetchResponse
- `virtualTerminalList()` - Returns VirtualTerminalListResponse
- `virtualTerminalUpdate()` - Returns VirtualTerminalUpdateResponse


<!-- API_DOCS_END -->

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
