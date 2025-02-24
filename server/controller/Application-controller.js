const Application = require("../models/application-model");
const Job = require("../models/job-model");
const User = require("../models/user-model");
const transporter = require("../utils/nodemailer");

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
    const job = await Job.findById(jobID).populate("createdBy");

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

    //GETTING USER DETAILS THROUGH USER ID TO MAIL
    const userData = await User.findById(userID);

    //MAILING RECRUITER ABOUT NEW APPLICANT
    const mailOptions = {
      from: "jatinhubhai6284@gmail.com",
      to: job?.createdBy?.email, // Sending to the recruiter's email
      subject: `New Applicant for Your Job Posting: ${newApplication?.job?.title}`,
      html: `
        <p>Dear ${job?.createdBy?.username},</p>
        <p>We are excited to inform you that a new applicant has applied for your job posting on <strong>Job Portal</strong>.</p>
        
        <h3>Applicant Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${userData?.username}</li>
          <li><strong>Email:</strong> ${userData?.email}</li>
          <li><strong>Applied At:</strong> ${
            newApplication?.createdAt
              ? new Date(newApplication.createdAt).toLocaleDateString()
              : "N/A"
          }</li>
        </ul>
    
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Job Title:</strong> ${job?.title}</li>
          <li><strong>Reference Number:</strong> ${
            newApplication?.job?._id
          }</li>
        </ul>
    
        <p>You can review the applicant's profile and take the next steps at your earliest convenience.</p>
        
        <p>For any assistance, feel free to reach out to us at <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a>.</p>
    
        <p>Best regards,</p>
        <p><strong>Jatin</strong><br>
        Job Portal<br>
        Contact: <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a></p>
      `,
    };

    // Send email only if mailOptions is set
    if (mailOptions) {
      await transporter.sendMail(mailOptions);
    }

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

    // FIND APPLICATION BY APPLICATION ID
    const application = await Application.findOne({ _id: applicationID })
      .populate("applicant")
      .populate("job");

    if (!application) {
      return res.status(400).json({
        MESSAGE: "Application not found",
        SUCCESS: false,
      });
    }

    // UPDATE STATUS
    application.status = status.toLowerCase();
    await application.save();

    // Email content based on status
    let mailOptions;
    if (application.status === "accepted") {
      mailOptions = {
        from: "jatinhubhai6284@gmail.com",
        to: application?.applicant?.email,
        subject: "Your Job Request Has Been Accepted!",
        html: `
        <p>Dear ${application.applicant.username},</p>
        <p>We are pleased to inform you that your job request for <strong>${
          application.job.title
        }</strong> has been successfully accepted. Our team is now preparing to proceed with your request.</p>
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Job Title:</strong> ${application.job.title}</li>
          <li><strong>Reference Number:</strong> ${application.job._id}</li>
          <li><strong>Applied at:</strong> ${
            application?.createdAt
              ? new Date(application.createdAt).toLocaleDateString()
              : "N/A"
          }</li>
        </ul>
        <p>If you have any questions or need further assistance, feel free to reach out to us at <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a>.</p>
        <p>Thank you for choosing <strong>Job Portal</strong>. We look forward to serving you!</p>
        <p>Best regards,</p>
        <p><strong>Jatin</strong><br>
        Job Portal<br>
        Contact: <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a></p>
      `,
      };
    } else if (application.status === "rejected") {
      mailOptions = {
        from: "jatinhubhai6284@gmail.com",
        to: application?.applicant?.email,
        subject: "Your Job Application Status Update",
        html: `
        <p>Dear ${application.applicant.username},</p>
        <p>We regret to inform you that your job application for <strong>${
          application.job.title
        }</strong> has not been accepted at this time.</p>
        <p>We appreciate the time and effort you put into your application. While this opportunity didn’t work out, we encourage you to apply for future openings that match your skills and experience.</p>
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Job Title:</strong> ${application.job.title}</li>
          <li><strong>Reference Number:</strong> ${application.job._id}</li>
          <li><strong>Applied at:</strong> ${
            application?.createdAt
              ? new Date(application.createdAt).toLocaleDateString()
              : "N/A"
          }</li>
        </ul>
        <p>We wish you the best in your job search. If you have any questions, feel free to reach out to us at <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a>.</p>
        <p>Best regards,</p>
        <p><strong>Jatin</strong><br>
        Job Portal<br>
        Contact: <a href="mailto:jatinhubhai6284@gmail.com">jatinhubhai6284@gmail.com</a></p>
      `,
      };
    }

    // Send email only if mailOptions is set
    if (mailOptions) {
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({
      MESSAGE: "Application Status Updated",
      SUCCESS: true,
    });
  } catch (error) {
    console.error("Error while updating status of application:", error);
    return res.status(500).json({
      MESSAGE: "Internal Server Error",
      SUCCESS: false,
    });
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
