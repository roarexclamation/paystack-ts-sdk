/**
 * Utility functions for working with Paystack amounts and currencies
 */

/**
 * Convert amount from Naira to Kobo (Paystack's base unit)
 * @param naira Amount in Naira
 * @returns Amount in Kobo
 */
export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}

/**
 * Convert amount from Kobo to Naira
 * @param kobo Amount in Kobo
 * @returns Amount in Naira
 */
export function koboToNaira(kobo: number): number {
  return kobo / 100;
}

/**
 * Format amount in Kobo to a human-readable Naira string
 * @param kobo Amount in Kobo
 * @returns Formatted string (e.g., "₦1,500.00")
 */
export function formatAmount(kobo: number): string {
  const naira = koboToNaira(kobo);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
  }).format(naira);
}

/**
 * Validate email format
 * @param email Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a unique reference for transactions
 * @param prefix Optional prefix for the reference
 * @returns Unique reference string
 */
export function generateReference(prefix = "txn"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Common Paystack status values
 */
export const PaystackStatus = {
  SUCCESS: "success",
  FAILED: "failed",
  PENDING: "pending",
  ABANDONED: "abandoned",
  REVERSED: "reversed",
} as const;

export type PaystackStatusType =
  (typeof PaystackStatus)[keyof typeof PaystackStatus];

/**
 * Common Paystack currencies
 */
export const PaystackCurrency = {
  NGN: "NGN",
  USD: "USD",
  GHS: "GHS",
  ZAR: "ZAR",
  KES: "KES",
} as const;

export type PaystackCurrencyType =
  (typeof PaystackCurrency)[keyof typeof PaystackCurrency];
