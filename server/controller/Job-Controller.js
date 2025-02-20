const Job = require("../models/job-model");

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

    const postedJob = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      CompanyID,
      createdBy: userID,
    });

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

module.exports = {
  postJobForAdmin,
  getAllJobs,
  getJobInfoById,
  getPostedJobByAdmin,
};
