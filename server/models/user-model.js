const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    // Subscription Details
    subscription: {
      id: { type: String }, // Razorpay Subscription ID
      status: { type: String }, // Track status
      expiryDate: { type: Date }, // Track when subscription ends
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "/Logo/defaultpfp.jpg",
      },
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    otpForPass: {
      //STORES OTP
      type: String,
      default: "",
    },
    otpForPassExpiresIn: {
      //THIS FIELD WILL STORE VALUE OF Date.Now()
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
