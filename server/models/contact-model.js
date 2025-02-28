const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = model("contact", contactSchema);
module.exports = Contact;
