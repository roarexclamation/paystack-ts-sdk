import { PaystackSDK } from "../src/index";
import { generateReference, formatAmount, isValidEmail } from "../src/utils";

// Initialize the SDK
const paystack = new PaystackSDK({
  secretKey: "sk_test_your_secret_key_here", // Replace with your actual secret key
  baseURL: "https://api.paystack.co", // Optional: defaults to Paystack's API URL
});

async function exampleUsage() {
  try {
    // Example 1: Initialize a transaction
    const transactionData = {
      email: "customer@example.com",
      amount: "50000", // Amount in kobo (₦500.00)
      reference: generateReference(), // Generate a unique reference
      currency: "NGN",
    };

    console.log("Initializing transaction with data:", transactionData);

    // Note: Uncomment the following lines when you have a valid API key
    /*
    const initResponse = await paystack.transactions.initializeTransaction(transactionData);
    console.log('Transaction initialized:', initResponse.data);
    */

    // Example 2: Utility functions
    console.log("\n--- Utility Functions Examples ---");

    // Email validation
    const email = "test@example.com";
    console.log(`Is "${email}" valid?`, isValidEmail(email));

    // Currency formatting
    const amount = 50000; // 50000 kobo = ₦500.00
    console.log(`Amount in kobo: ${amount}`);
    console.log(`Formatted amount: ${formatAmount(amount)}`);

    // Reference generation
    const reference = generateReference();
    console.log(`Generated reference: ${reference}`);

    // Example 3: List banks (requires API key)
    /*
    const banksResponse = await paystack.miscellaneous.listBanks({ country: 'nigeria' });
    console.log('Available banks:', banksResponse.data.data?.slice(0, 5)); // Show first 5 banks
    */
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
if (require.main === module) {
  exampleUsage();
}
