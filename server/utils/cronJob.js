import cron from "node-cron";
import Razorpay from "razorpay";
import User from "../models/user-model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

console.log("Cron job initialized...");

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running subscription expiry check...");

    const now = new Date();

    // Step 1: Fetch users with active subscriptions
    const users = await User.find({ "subscription.status": "active" });

    let expiredCount = 0;

    for (const user of users) {
      try {
        // Step 2: Fetch subscription from Razorpay
        const razorpaySubscription = await razorpay.subscriptions.fetch(
          user.subscription.id
        );

        // Step 3: Compare expiry dates
        const razorpayExpiry = new Date(
          razorpaySubscription.current_end * 1000 //RAZORPAY -> SECONDS so * 1000 -> JS Milliseconds
        );

        if (razorpayExpiry < now || razorpaySubscription.status !== "active") {
          // Step 4: Update user subscription status to expired
          await User.updateOne(
            { _id: user._id },
            { $set: { "subscription.status": "expired" } }
          );
          expiredCount++;
        }
      } catch (error) {
        console.error(
          `Error fetching subscription for user ${user._id}:`,
          error
        );
      }
    }

    console.log(`Subscriptions expired: ${expiredCount}`);
  } catch (error) {
    console.error("Error updating expired subscriptions:", error);
  }
});
