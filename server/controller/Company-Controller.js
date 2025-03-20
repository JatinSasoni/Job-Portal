const Application = require("../models/application-model");
const Company = require("../models/company-model");
const Job = require("../models/job-model");
const uploadToCloudinary = require("../utils/cloudinary");

//REGISTERING COMPANY BY USER(Recruiter)
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    //HANDLING NO COMPANY NAME
    if (!companyName) {
      return res.status(400).json({
        MESSAGE: "Company Name is Missing",
        SUCCESS: false,
      });
    }

    //COMPANY || COMPANY NAME ALREADY EXISTS
    const company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        MESSAGE: "Company already registered",
        SUCCESS: false,
      });
    }

    //REGISTERING COMPANY
    const userID = req.id; // AUTHENTICATED USER ID FROM MIDDLEWARE
    const createdCompany = await Company.create({
      companyName,
      createdBy: userID,
    });

    return res.status(201).json({
      MESSAGE: "Company Registered Successfully",
      createdCompany,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while registering company");
    res.status(500).json({ message: "Server error" });
  }
};

//API FOR COMPANIES CREATED BY USER(Recruiter)
const getCompanyCreatedByRecruiter = async (req, res) => {
  try {
    const userID = req.id; //LOGGED IN USER

    const companies = await Company.find({
      createdBy: userID,
    });

    //NO COMPANIES CREATED BY USER
    if (!companies) {
      return res.status(400).json({
        MESSAGE: "No Companies Found",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: `Companies Found : ${companies.length}`,
      companies,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while loading companies");
    res.status(500).json({ message: "Server error" });
  }
};

//API FOR COMPANY ID
const getCompanyByID = async (req, res) => {
  try {
    const companyID = req.params.companyID; // companyID IS DEFINED IN ROUTE

    //NO COMPANY ID PROVIDED
    if (!companyID) {
      return res.status(400).json({
        MESSAGE: "No Company ID provided",
        SUCCESS: false,
      });
    }

    const company = await Company.findById(companyID);

    //NO COMPANY WITH ABOVE ID
    if (!company) {
      return res.status(400).json({
        MESSAGE: "Company Not Found",
        SUCCESS: false,
      });
    }

    return res.status(200).json({
      MESSAGE: "OK",
      company,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while loading company");
    res.status(500).json({ message: "Server error" });
  }
};

//API FOR UPDATING COMPANY PROFILE
const updateCompany = async (req, res) => {
  try {
    const companyID = req.params.companyID; // companyID IS DEFINED IN ROUTE

    //NO COMPANY ID PROVIDED
    if (!companyID) {
      return res.status(400).json({
        MESSAGE: "No Company ID provided",
        SUCCESS: false,
      });
    }

    const company = await Company.findById(companyID);

    //HANDLING IF NO COMPANY WITH SUCH ID
    if (!company) {
      return res.status(400).json({
        MESSAGE: "No Company Found",
        SUCCESS: false,
      });
    }

    //DESTRUCTURING DATA
    const { companyName, description, website, location } = req.body;
    //LOGO
    const file = req.file; //WILL RETURN UNDEFINED IF NO FILE IN REQ.FILE

    //UPDATING DATA
    if (companyName) company.companyName = companyName;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    //--HANDLING CLOUDINARY--
    // Handling resume upload
    if (file) {
      //RETURN SECURE URL
      const companyLogoUrl = await uploadToCloudinary(
        file,
        "uploads/companyLogo"
      );
      if (companyLogoUrl) {
        company.logo = companyLogoUrl;
      }
    }

    await company.save();

    return res.status(201).json({
      MESSAGE: "Company Information Updated",
      SUCCESS: true,
    });
  } catch (error) {
    console.log("Error while updating company");
    res.status(500).json({ message: "Server error" });
  }
};

//DELETE COMPANY BY ID
const deleteCompanyByID = async (req, res) => {
  try {
    const companyID = req.params.companyID;

    if (!companyID) {
      return res.status(400).json({
        MESSAGE: "No Company ID provided",
        SUCCESS: false,
      });
    }

    //FIND AND DELETE
    const company = await Company.findByIdAndDelete(companyID);

    //HANDLING IF NO COMPANY WITH SUCH ID
    if (!company) {
      return res.status(400).json({
        MESSAGE: "No Company Found",
        SUCCESS: false,
      });
    }

    //JOBS ASSOCIATED WITH COMPANY
    const jobsCreatedByCompany = await Job.find({ CompanyID: companyID });

    // GET JOB IDs INTO ARRAY
    const jobIDs = jobsCreatedByCompany.map((job) => job._id);

    if (jobIDs.length > 0) {
      await Promise.all([
        Application.deleteMany({ job: { $in: jobIDs } }), // Delete all related applications
        Job.deleteMany({ _id: { $in: jobIDs } }), // Delete all related jobs
      ]);
    }

    return res.status(200).json({
      MESSAGE:
        "Company and all related jobs and applications removed successfully",
      SUCCESS: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });

    console.log("Error while deleting company");
  }
};

module.exports = {
  registerCompany,
  getCompanyCreatedByRecruiter,
  getCompanyByID,
  updateCompany,
  deleteCompanyByID,
};
