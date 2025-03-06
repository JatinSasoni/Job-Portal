const { transporter, transporterContact } = require("./nodemailer");

const sendMailUsingTransporter = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};

const sendMailUsingTransporterContact = async (mailOption) => {
  try {
    await transporterContact.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMailUsingTransporter, sendMailUsingTransporterContact };
