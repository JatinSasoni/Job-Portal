const { Schema, model, Types, default: mongoose } = require("mongoose");

const contactSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = model("contact", contactSchema);
module.exports = Contact;
