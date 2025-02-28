const Application = require("../models/application-model");
const Job = require("../models/job-model");
const User = require("../models/user-model");
const sendMailUsingTransporter = require("../utils/transporter");

//CREATE JOB API FOR AUTHENTICATED ADMIN
const postJobForAdmin = async (req, res) => {
  try {
    //DESTRUCTURING DATA
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      CompanyID,
    } = req.body;

    const userID = req.id; //MIDDLEWARE

    const user = await User.findById(userID);

    if (!user || user.role !== "recruiter") {
      return res.status(400).json({
        MESSAGE: "User not found",
        SUCCESS: false,
      });
    }

    //IF ANY FIELD LEFT OUT
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experienceLevel ||
      !CompanyID
    ) {
      return res.status(400).json({
        MESSAGE: "Please fill out every detail",
        SUCCESS: false,
      });
    }

    //REQUIREMENTS LOGIC
    const requirementArray = requirements.split(",").map((elem) => elem);

    const postedJob = await Job.create({
      title,
      description,
      requirements: requirementArray,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      CompanyID,
      createdBy: userID,
    });

    // SENDING MAIL
    const mailOption = {
      from: `"${process.env.COMPANY_NAME}" <${process.env.COMPANY_EMAIL}>`,
      to: user.email, // recruiter's email
      subject: `Job Posting Confirmation - ${process.env.COMPANY_NAME}`,
      text: `Dear Recruiter,

    Your job posting has been successfully published on ${
      process.env.COMPANY_NAME
    }.

    Job Details:
    - Title: ${postedJob.title}
    - Location: ${postedJob.location}
    - Job Type: ${postedJob.jobType}
    - Position: ${postedJob.position}
    - Experience : ${postedJob.experienceLevel}
    - Salary: ${
      postedJob.salary ? `${postedJob.salary} (LPA)` : "Not specified"
    }

    Thank you for choosing ${
      process.env.COMPANY_NAME
    } to connect with top talent. If you need any modifications or assistance, feel free to contact our support team.

    Best regards,
    ${process.env.COMPANY_NAME} Team`,
    };

    if (mailOption) {
      sendMailUsingTransporter(mailOption);
    }

    return res.status(201).json({
      MESSAGE: "Job Posted Successfully",
      postedJob,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while Posting JOB");
  }
};

//API FOR FETCHING JOBS FOR STUDENT || JobSEEKER
const getAllJobs = async (req, res) => {
  try {
    //Keyword IS A QUERY STRING CONTAINING USER APPLIED FILTER FOR JOB LIKE "Frontend Dev"
    const keyword = req.query.keyword || ""; //BY DEFAULT "" MEANS EVERY DOCUMENT WILL RETURN

    const query = {
      //RETURNS DOCUMENTS WITH EITHER TITLE OR DESCRIPTION MATCHED THROUGH $regex
      // $options: "i" = CASE-INSENSITIVE
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const allJobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate("CompanyID");

    //NO JOBS FOUND
    if (!allJobs) {
      return res.status(400).json({
        MESSAGE: "Jobs not found",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: `Jobs found ${allJobs.length}`,
      allJobs,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while fetching jobs");
  }
};

//API FOR FETCHING JOB DESCRIPTION BY JOB-ID FOR STUDENT
const getJobInfoById = async (req, res) => {
  try {
    const jobID = req.params.jobID;
    const job = await Job.findById(jobID)
      .populate("CompanyID")
      .populate("application");

    //INVALID JOB_ID OR NO JOB WITH SUC JOB_ID
    if (!job) {
      return res.status(400).json({
        MESSAGE: "Job not found",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: `Jobs found successfully`,
      job,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while fetching job info");
  }
};

//API FOR FETCHING JOBS POSTED BY AUTHENTICATED ADMIN || RECRUITER
const getPostedJobByAdmin = async (req, res) => {
  try {
    const userID = req.id; //MIDDLEWARE

    const postedJobs = await Job.find({
      createdBy: userID,
    }).populate("CompanyID");

    if (!postedJobs) {
      return res.status(400).json({
        MESSAGE: "No jobs were posted by this user",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: `Jobs found ${postedJobs.length}`,
      postedJobs,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while fetching job info");
  }
};

//DELETE Job BY ID
const deleteJobByID = async (req, res) => {
  try {
    const jobID = req.params.jobID;
    if (!jobID) {
      return res.status(400).json({
        MESSAGE: "No jobID ID provided",
        SUCCESS: false,
      });
    }

    //FIND AND DELETE
    const job = await Job.findByIdAndDelete(jobID);

    //HANDLING IF NO job WITH SUCH ID
    if (!job) {
      return res.status(400).json({
        MESSAGE: "Job not found",
        SUCCESS: false,
      });
    }

    const deletedApplications = await Application.deleteMany({ job: jobID });

    return res.status(200).json({
      MESSAGE: "Job Post and all related applications removed successfully",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while deleting company");
  }
};

module.exports = {
  postJobForAdmin,
  getAllJobs,
  getJobInfoById,
  getPostedJobByAdmin,
  deleteJobByID,
};
