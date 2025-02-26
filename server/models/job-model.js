const { Schema, model, default: mongoose } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      //IN LPA
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    //FULL TIME OR PART TIME
    jobType: {
      //FULL-TIME , REMOTE etc
      type: String,
      required: true,
    },
    position: {
      //Number of openings
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    CompanyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //APPLICANTS
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);
module.exports = Job;
