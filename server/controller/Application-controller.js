const Application = require("../models/application-model");
const Job = require("../models/job-model");

//STUDENT|| JobSEEKER APPLYING FOR JOB
const applyForJob = async (req, res) => {
  try {
    //JOB AND APPLICANT
    const jobID = req.params.jobID;
    const userID = req.id;

    if (!jobID) {
      return res.status(400).json({
        MESSAGE: "Job id required",
        SUCCESS: false,
      });
    }

    //CHECK IF ALREADY APPLIED FOR JOB
    const alreadyApplied = await Application.findOne({
      job: jobID,
      applicant: userID,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        MESSAGE: "Already applied for this job",
        SUCCESS: false,
      });
    }

    //JOB EXISTS? IF EXISTS UPDATE ITS NO. OF APPLICATIONS
    const job = await Job.findById(jobID);

    if (!job) {
      return res.status(400).json({
        MESSAGE: "NO SUCH JOB",
        SUCCESS: false,
      });
    }

    //JOB EXISTS - CREATE NEW APPLICATION
    const newApplication = await Application.create({
      job: jobID,
      applicant: userID,
    });

    //UPDATE JOB COLLECTION
    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      MESSAGE: "Applied for job successfully",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while applying for job");
  }
};

//API FOR FETCHING JOBS APPLIED BY THE USER
const getAppliedJobsByUser = async (req, res) => {
  try {
    const userID = req.id;

    const appliedJobs = await Application.find({
      applicant: userID,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "CompanyID",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!appliedJobs) {
      return res.status(400).json({
        MESSAGE: "Applications not found",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: `Applied jobs ${appliedJobs.length}`,
      appliedJobs,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while fetching applied jobs");
  }
};

//UPDATING JOB / APPLICATION STATUS BY ADMIN || RECRUITER
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationID = req.params.applicationID;

    if (!status) {
      return res.status(400).json({
        MESSAGE: "Status is required",
        SUCCESS: false,
      });
    }

    //FIND APPLICATION BY APPLICATION ID

    const application = await Application.findOne({ _id: applicationID });

    if (!application) {
      return res.status(400).json({
        MESSAGE: "Application not found",
        SUCCESS: false,
      });
    }

    //UPDATE STATUS
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      MESSAGE: "Application Status Updated",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while updating status of application");
  }
};

//API FOR FETCHING ALL JOB APPLICATIONS APPLIED TO JOBS POSTED BY RECRUITER
const appliedApplicationsForJob = async (req, res) => {
  try {
    const userID = req.id;
    const jobID = req.params.jobID;

    const job = await Job.findById(jobID).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    //NO JOB POSTED OR NO DATA IN COLLECTION
    if (!job) {
      return res.status(400).json({
        MESSAGE: "No job or applications found ",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: "DONE",
      job,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while updating status of application");
  }
};

module.exports = {
  applyForJob,
  getAppliedJobsByUser,
  updateApplicationStatus,
  appliedApplicationsForJob,
};
