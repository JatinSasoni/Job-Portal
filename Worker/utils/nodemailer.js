import nodemailer from "nodemailer";

console.log("Setting up nodemailer transporters...", process.env.BREVO_USER);
export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const transporterContact = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SELF_EMAIL,
    pass: process.env.SELF_PASSS,
  },
});
