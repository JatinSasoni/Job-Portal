const Company = require("../models/company-model");

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
        MESSAGE: "You can't register same company",
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
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while registering company");
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

    //HANDLING IF NO COMPANY WITH SUCH ID
    const doesCompanyExists = await Company.findById(companyID);
    if (!doesCompanyExists) {
      return res.status(400).json({
        MESSAGE: "No Company Found",
        SUCCESS: false,
      });
    }

    //DESTRUCTURING DATA
    const { companyName, description, website, location } = req.body;

    //UPDATING COMPANY PROFILE
    const updatedCompanyData = await Company.findByIdAndUpdate(
      companyID,
      {
        companyName,
        description,
        website,
        location,
      },
      { new: true } //RETURNS DOCUMENT AFTER UPDATE APPLIED
    );

    if (!updatedCompanyData) {
      return res.status(400).json({
        MESSAGE: "UPDATE FAILED",
        SUCCESS: false,
      });
    }

    return res.status(201).json({
      MESSAGE: "Company Information Updated",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while updating company");
  }
};

module.exports = {
  registerCompany,
  getCompanyCreatedByRecruiter,
  getCompanyByID,
  updateCompany,
};
