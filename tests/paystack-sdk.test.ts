import { PaystackSDK } from "../src/index";
import {
  nairaToKobo,
  koboToNaira,
  formatAmount,
  isValidEmail,
  generateReference,
} from "../src/utils";

describe("PaystackSDK", () => {
  const validConfig = {
    secretKey: "sk_test_1234567890abcdef",
  };

  describe("Constructor", () => {
    it("should create instance with valid config", () => {
      const sdk = new PaystackSDK(validConfig);
      expect(sdk).toBeInstanceOf(PaystackSDK);
      expect(sdk.transactions).toBeDefined();
      expect(sdk.customers).toBeDefined();
    });

    it("should throw error for missing secret key", () => {
      expect(() => {
        new PaystackSDK({ secretKey: "" });
      }).toThrow("Paystack secret key is required");
    });

    it("should throw error for invalid secret key format", () => {
      expect(() => {
        new PaystackSDK({ secretKey: "invalid_key" });
      }).toThrow('Invalid Paystack secret key format. Must start with "sk_"');
    });

    it("should use custom base URL when provided", () => {
      const customBaseURL = "https://custom.api.com";
      const sdk = new PaystackSDK({
        ...validConfig,
        baseURL: customBaseURL,
      });

      const config = sdk.getConfig();
      expect(config.basePath).toBe(customBaseURL);
    });
  });

  describe("API Clients", () => {
    let sdk: PaystackSDK;

    beforeEach(() => {
      sdk = new PaystackSDK(validConfig);
    });

    it("should have all API clients available", () => {
      const expectedClients = [
        "transactions",
        "customers",
        "plans",
        "subscriptions",
        "products",
        "pages",
        "splits",
        "subaccounts",
        "transfers",
        "transferRecipients",
        "refunds",
        "charges",
        "bulkCharges",
        "balance",
        "settlements",
        "disputes",
        "verification",
        "integration",
        "paymentRequests",
        "dedicatedAccounts",
      ];

      expectedClients.forEach((client) => {
        expect(sdk[client as keyof PaystackSDK]).toBeDefined();
      });
    });
  });
});
