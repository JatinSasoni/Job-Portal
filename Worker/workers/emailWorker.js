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
    console.log(" Sending email to:", mailOptions?.to);
    if (job.name === "contactFormSubmission") {
      console.log("Contact form email");
      await sendMailUsingTransporterContact(mailOptions);
    } else {
      console.log("TalentNest email");
      await sendMailUsingTransporter(mailOptions);
    }
    console.log("Email sent successfully to:", mailOptions.to);
  },
  {
    connection: queueConnection,
  }
);

emailWorker.on("completed", (job) => {
  console.log(` Job ${job.id} completed for ${job.data.mailOptions.to}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
