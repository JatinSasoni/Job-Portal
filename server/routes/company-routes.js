import { Router } from "express";
import isAuthentication from "../middleware/userAuthentications.js";
import upload from "../middleware/multer.js";
import {
  deleteCompanyByID,
  getCompanyByID,
  getCompanyCreatedByRecruiter,
  registerCompany,
  updateCompany,
} from "../controller/Company-Controller.js";

const router = Router();

//USER BUSINESS LOGIC
router.route("/register").post(isAuthentication, registerCompany);
router.route("/get").get(isAuthentication, getCompanyCreatedByRecruiter);
router.route("/get/:companyID").get(isAuthentication, getCompanyByID);
router
  .route("/update/:companyID")
  .put(isAuthentication, upload.single("file"), updateCompany);

router
  .route("/remove/:companyID/delete")
  .delete(isAuthentication, deleteCompanyByID);

export default router;
