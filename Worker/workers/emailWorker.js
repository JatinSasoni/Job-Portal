import { Worker } from "bullmq";
import queueConnection from "../config/queueConnection.js";
import {
  sendMailUsingTransporter,
  sendMailUsingTransporterContact,
} from "../utils/transporter.js";

const emailWorker = new Worker(
  process.env.EMAIL_QUEUE_NAME,
  async (job) => {
    if (!job.data || !job.data.mailOptions) {
      throw new Error("Invalid job data: mailOptions is required");
    }
    const { mailOptions } = job.data;
    if (job.name === "contactFormSubmission") {
      await sendMailUsingTransporterContact(mailOptions);
    } else {
      await sendMailUsingTransporter(mailOptions);
    }
  },
  {
    connection: queueConnection,
  }
);

if (process.env.NODE_ENV !== "production") {
  emailWorker.on("completed", (job) => {
    console.log(` Job ${job.id} completed for ${job.data.mailOptions.to}`);
  });
}

if (process.env.NODE_ENV !== "production") {
  emailWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
  });
}
