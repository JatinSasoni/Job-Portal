const cron = require("node-cron");
const User = require("../models/user-model");

console.log("Cron job initialized...");

cron.schedule("0 0 * * *", async () => {
  // Runs at midnight
  try {
    console.log("Running subscription expiry check...");

    const now = new Date();
    const result = await User.updateMany(
      { "subscription.expiryDate": { $lt: now } },
      { $set: { "subscription.status": "expired" } }
    );

    console.log(`Expired subscriptions updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error updating expired subscriptions:", error);
  }
});
