require("dotenv").config();
import { Worker } from "bullmq";
import { sendMailUsingTransporter } from "../utils/emailService.js";
import { redis } from "../config/redisConfig.js";

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { mailOptions } = job.data;
    console.log("📨 Sending email to:", mailOptions?.to);
    await sendMailUsingTransporter(mailOptions);
    console.log("✅ Email sent successfully to:", mailOptions.to);
  },
  {
    connection: redis,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed for ${job.data.mailOptions.to}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});
