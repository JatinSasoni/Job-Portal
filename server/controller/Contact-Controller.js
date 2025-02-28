const Contact = require("../models/contact-model");
const transporter = require("../utils/nodemailer");

//CONTACT PAGE
const contactController = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if ((!username, !email, !message)) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }

    const isRegisteredUser = await Contact.findOne({ email });

    //IF USER IS REGISTERED STORE DATA
    if (isRegisteredUser) {
      const postedContactData = await Contact.create({
        username,
        email,
        message,
      });
    }

    const mailOption = {
      from: email,
      to: "jatinhubhai6284@gmail.com", // Recruiter's email
      subject: "New Contact Form Submission ",
      html: `
          <h3>Contact Form Submission</h3>
          <p><strong>Name:</strong> ${username}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p>Kindly reach out to the user as soon as possible.</p>
        `,
    };

    if (mailOption) {
      await transporter.sendMail(mailOption);
    }

    return res.status(200).json({
      MESSAGE: "Your message has been sent successfully!",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      MESSAGE: "Server error",
      SUCCESS: false,
    });
  }
};

module.exports = contactController;
