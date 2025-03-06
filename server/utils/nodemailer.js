const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "865a40002@smtp-brevo.com",
    pass: "vPEd12A0fyQBKabO",
  },
});

const transporterContact = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jatinhubhai6284@gmail.com",
    pass: "derl wbtg rzbq dema",
  },
});

module.exports = { transporter, transporterContact };

// hezc zmct jqrz lztl
