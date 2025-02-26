const { Router } = require("express");
const companyController = require("../controller/Company-Controller");
const isAuthentication = require("../middleware/userAuthentications");
const upload = require("../middleware/multer");

const router = Router();

//USER BUSINESS LOGIC
router
  .route("/register")
  .post(isAuthentication, companyController.registerCompany);
router
  .route("/get")
  .get(isAuthentication, companyController.getCompanyCreatedByRecruiter);
router
  .route("/get/:companyID")
  .get(isAuthentication, companyController.getCompanyByID);
router
  .route("/update/:companyID")
  .put(
    isAuthentication,
    upload.single("file"),
    companyController.updateCompany
  );

router
  .route("/remove/:companyID/delete")
  .delete(isAuthentication, companyController.deleteCompanyByID);

module.exports = router;
