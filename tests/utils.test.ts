import {
  nairaToKobo,
  koboToNaira,
  formatAmount,
  isValidEmail,
  generateReference,
  PaystackStatus,
  PaystackCurrency,
} from "../src/utils";

describe("Utils", () => {
  describe("Currency conversion", () => {
    it("should convert Naira to Kobo correctly", () => {
      expect(nairaToKobo(100)).toBe(10000);
      expect(nairaToKobo(50.5)).toBe(5050);
      expect(nairaToKobo(0)).toBe(0);
    });

    it("should convert Kobo to Naira correctly", () => {
      expect(koboToNaira(10000)).toBe(100);
      expect(koboToNaira(5050)).toBe(50.5);
      expect(koboToNaira(0)).toBe(0);
    });

    it("should format amount correctly", () => {
      const formatted = formatAmount(10000);
      expect(formatted).toContain("100");
      expect(typeof formatted).toBe("string");
    });
  });

  describe("Email validation", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("test+tag@example.org")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("test.example.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("Reference generation", () => {
    it("should generate unique references", () => {
      const ref1 = generateReference();
      const ref2 = generateReference();

      expect(ref1).not.toBe(ref2);
      expect(ref1).toMatch(/^txn_\d+_[a-z0-9]+$/);
    });

    it("should use custom prefix", () => {
      const ref = generateReference("payment");
      expect(ref).toMatch(/^payment_\d+_[a-z0-9]+$/);
    });
  });

  describe("Constants", () => {
    it("should have correct status values", () => {
      expect(PaystackStatus.SUCCESS).toBe("success");
      expect(PaystackStatus.FAILED).toBe("failed");
      expect(PaystackStatus.PENDING).toBe("pending");
      expect(PaystackStatus.ABANDONED).toBe("abandoned");
      expect(PaystackStatus.REVERSED).toBe("reversed");
    });

    it("should have correct currency values", () => {
      expect(PaystackCurrency.NGN).toBe("NGN");
      expect(PaystackCurrency.USD).toBe("USD");
      expect(PaystackCurrency.GHS).toBe("GHS");
      expect(PaystackCurrency.ZAR).toBe("ZAR");
      expect(PaystackCurrency.KES).toBe("KES");
    });
  });
});
