import mongoose from "mongoose";
import { Schema, model } from "mongoose";

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
export default Contact;
