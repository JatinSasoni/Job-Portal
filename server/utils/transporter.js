const transporter = require("./nodemailer");

const sendMailUsingTransporter = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMailUsingTransporter;
