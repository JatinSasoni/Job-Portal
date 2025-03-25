const Application = require("../models/application-model");
const Job = require("../models/job-model");
const User = require("../models/user-model");
const { sendMailUsingTransporter } = require("../utils/transporter");

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
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: FALSE });
    console.log("Error while Posting JOB");
  }
};

const editJobPost = async (req, res) => {
  try {
    const { jobID } = req.params; // Get Job ID from URL params
    const userId = req.id; // Get logged-in user's ID (assuming authentication middleware)

    // Fields that can be updated
    const updatableFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "position",
      "experienceLevel",
      "CompanyID",
    ];

    // Create an update object with only provided fields
    const updateData = {};
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.requirements) {
      updateData.requirements = updateData.requirements
        .split(",")
        .map((elem) => elem.trim());
    }

    // Check if job exists
    const job = await Job.findById(jobID);
    if (!job) {
      return res.status(404).json({ MESSAGE: "Job not found", SUCCESS: false });
    }

    // Ensure only the creator or admin can edit the job
    if (job.CompanyID.toString() !== userId && req.role !== "recruiter") {
      return res
        .status(403)
        .json({ MESSAGE: "Unauthorized to edit this job", SUCCESS: false });
    }

    // Update the job post
    const updatedJob = await Job.findByIdAndUpdate(
      jobID,
      { $set: updateData },
      { new: true, runValidators: true } //By default, findByIdAndUpdate() bypasses schema validation.
    );

    res.status(200).json({
      MESSAGE: "Job post updated successfully",
      job: updatedJob,
      SUCCESS: true,
    });
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(500).json({ MESSAGE: "Internal server error", SUCCESS: false });
  }
};

//API FOR FETCHING JOBS FOR STUDENT || JobSEEKER

const getAllJobs = async (req, res) => {
  try {
    //Keyword IS A QUERY STRING CONTAINING USER APPLIED FILTER FOR JOB LIKE "Frontend Dev"
    const keyword = req.query.keyword || ""; //BY DEFAULT "" MEANS EVERY DOCUMENT WILL RETURN
    const page = Number(req.query.page) || 1; //BY DEFAULT "" MEANS EVERY DOCUMENT WILL RETURN
    const limit = Number(req.query.limit) || 8; //BY DEFAULT "" MEANS EVERY DOCUMENT WILL RETURN
    const skip = (page - 1) * limit;

    const query = {
      //RETURNS DOCUMENTS WITH EITHER TITLE OR DESCRIPTION MATCHED THROUGH $regex
      // $options: "i" = CASE-INSENSITIVE
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const totalJobs = await Job.countDocuments(query);
    const allJobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate("CompanyID")
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      MESSAGE: `Jobs found ${allJobs.length}`,
      allJobs,
      page,
      limit,
      totalJobs,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ MESSAGE: "Server error", SUCCESS: false });
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
    console.log("Error while fetching job info");
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: FALSE });
  }
};

//API FOR FETCHING JOB DESCRIPTION BY JOB-ID FOR RECRUITER
const getJobInfoByIdForAdmin = async (req, res) => {
  try {
    const jobID = req.params.jobID;

    if (!jobID) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }

    // Ensure only the creator or admin can edit the job
    if (req.role !== "recruiter") {
      return res
        .status(403)
        .json({ MESSAGE: "Unauthorized to edit this job", SUCCESS: false });
    }

    const job = await Job.findById(jobID).populate({
      path: "CompanyID",
      select: "logo companyName",
    });

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
    console.log("Error while fetching job info");
    res.status(500).json({ MESSAGE: "Internal server error", SUCCESS: false });
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
    console.log("Error while fetching job info");
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: FALSE });
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
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: FALSE });
    console.log("Error while deleting company");
  }
};

//GET SAVED JOB
const getSavedJobs = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: {
        path: "CompanyID",
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ MESSAGE: "User not found", SUCCESS: false });
    }

    res.status(200).json({
      MESSAGE: "JOBS FOUND",
      SUCCESS: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: false });
  }
};

const getFeaturedJobs = async (req, res) => {
  try {
    // Find all recruiters with an active subscription
    const activeSubscribers = await User.find(
      { "subscription.status": "active" }, // Find users with active subscription
      "_id" // Only fetch the recruiter IDs
    );

    // Extract recruiter IDs
    const recruiterIds = activeSubscribers.map((user) => user._id);

    // Fetch jobs posted by these recruiters
    const featuredJobs = await Job.find({ createdBy: { $in: recruiterIds } })
      .populate("CompanyID")
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Optional: Limit the number of featured jobs

    res.status(200).json({
      MESSAGE: "JOBS FOUND",
      SUCCESS: true,
      featuredJobs,
    });
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    res.status(500).json({ MESSAGE: "Server error", SUCCESS: false });
  }
};

module.exports = {
  postJobForAdmin,
  getAllJobs,
  getJobInfoById,
  getPostedJobByAdmin,
  getJobInfoByIdForAdmin,
  deleteJobByID,
  getSavedJobs,
  editJobPost,
  getFeaturedJobs,
};
