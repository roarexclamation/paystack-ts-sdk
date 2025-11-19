// This file is auto-generated. Do not edit manually.
// Generated from: 2025-11-19T14:10:08.652Z

// Import everything from the generated SDK
import {
  Configuration,
  ConfigurationParameters,
  // API classes
  ApplePayApi,
  BalanceApi,
  BankApi,
  BulkChargeApi,
  ChargeApi,
  CustomerApi,
  DedicatedVirtualAccountApi,
  DirectDebitApi,
  DisputeApi,
  IntegrationApi,
  MiscellaneousApi,
  OrderApi,
  PageApi,
  PaymentRequestApi,
  PlanApi,
  ProductApi,
  RefundApi,
  SettlementApi,
  SplitApi,
  StorefrontApi,
  SubaccountApi,
  SubscriptionApi,
  TerminalApi,
  TransactionApi,
  TransferApi,
  TransferRecipientApi,
  VirtualTerminalApi,
} from "../generated/src/index.js";

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
 * ```typescript
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
 * ```
 */
export class PaystackSDK {
  private config: Configuration;

  // API client properties (auto-generated)
  public readonly applePay: ApplePayApi;
  public readonly balance: BalanceApi;
  public readonly bank: BankApi;
  public readonly bulkCharges: BulkChargeApi;
  public readonly charges: ChargeApi;
  public readonly customers: CustomerApi;
  public readonly dedicatedAccounts: DedicatedVirtualAccountApi;
  public readonly directDebit: DirectDebitApi;
  public readonly disputes: DisputeApi;
  public readonly integration: IntegrationApi;
  public readonly miscellaneous: MiscellaneousApi;
  public readonly order: OrderApi;
  public readonly pages: PageApi;
  public readonly paymentRequests: PaymentRequestApi;
  public readonly plans: PlanApi;
  public readonly products: ProductApi;
  public readonly refunds: RefundApi;
  public readonly settlements: SettlementApi;
  public readonly splits: SplitApi;
  public readonly storefront: StorefrontApi;
  public readonly subaccounts: SubaccountApi;
  public readonly subscriptions: SubscriptionApi;
  public readonly terminal: TerminalApi;
  public readonly transactions: TransactionApi;
  public readonly transfers: TransferApi;
  public readonly transferRecipients: TransferRecipientApi;
  public readonly virtualTerminal: VirtualTerminalApi;

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
    this.applePay = new ApplePayApi(this.config);
    this.balance = new BalanceApi(this.config);
    this.bank = new BankApi(this.config);
    this.bulkCharges = new BulkChargeApi(this.config);
    this.charges = new ChargeApi(this.config);
    this.customers = new CustomerApi(this.config);
    this.dedicatedAccounts = new DedicatedVirtualAccountApi(this.config);
    this.directDebit = new DirectDebitApi(this.config);
    this.disputes = new DisputeApi(this.config);
    this.integration = new IntegrationApi(this.config);
    this.miscellaneous = new MiscellaneousApi(this.config);
    this.order = new OrderApi(this.config);
    this.pages = new PageApi(this.config);
    this.paymentRequests = new PaymentRequestApi(this.config);
    this.plans = new PlanApi(this.config);
    this.products = new ProductApi(this.config);
    this.refunds = new RefundApi(this.config);
    this.settlements = new SettlementApi(this.config);
    this.splits = new SplitApi(this.config);
    this.storefront = new StorefrontApi(this.config);
    this.subaccounts = new SubaccountApi(this.config);
    this.subscriptions = new SubscriptionApi(this.config);
    this.terminal = new TerminalApi(this.config);
    this.transactions = new TransactionApi(this.config);
    this.transfers = new TransferApi(this.config);
    this.transferRecipients = new TransferRecipientApi(this.config);
    this.virtualTerminal = new VirtualTerminalApi(this.config);
  }

  /**
   * Get the current configuration
   */
  public getConfig(): Configuration {
    return this.config;
  }
}

// Re-export commonly used types and interfaces
export * from "../generated/src/models/index.js";
export {
  ApplePayApi,
  BalanceApi,
  BankApi,
  BulkChargeApi,
  ChargeApi,
  CustomerApi,
  DedicatedVirtualAccountApi,
  DirectDebitApi,
  DisputeApi,
  IntegrationApi,
  MiscellaneousApi,
  OrderApi,
  PageApi,
  PaymentRequestApi,
  PlanApi,
  ProductApi,
  RefundApi,
  SettlementApi,
  SplitApi,
  StorefrontApi,
  SubaccountApi,
  SubscriptionApi,
  TerminalApi,
  TransactionApi,
  TransferApi,
  TransferRecipientApi,
  VirtualTerminalApi,
  Configuration,
  ConfigurationParameters,
} from "../generated/src/index.js";
