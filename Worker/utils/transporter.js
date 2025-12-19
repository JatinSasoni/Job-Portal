import { transporter, transporterContact } from "./nodemailer.js";

export const sendMailUsingTransporter = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error?.message);
  }
};

export const sendMailUsingTransporterContact = async (mailOption) => {
  try {
    await transporterContact.sendMail(mailOption);
  } catch (error) {
    console.log(error?.message);
  }
};
