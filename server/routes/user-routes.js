import { Router } from "express";
import isAuthentication from "../middleware/userAuthentications.js";
import upload from "../middleware/multer.js";
import {
  validateUserRegistration,
  validateUserLogin,
  validateMongooseID,
  validateEmailForOTP,
  validatePasswordReset,
} from "../validations/userValidators.js";
import validateResults from "../middleware/validate-result.js";
import { body } from "express-validator";
import {
  ChangePassword,
  createOrder,
  getUserForAdmin,
  login,
  logout,
  paymentVerification,
  register,
  saveJob,
  sendOTPForPass,
  updateProfile,
  validateOTPToChangePass,
} from "../controller/User-Controller.js";

const router = Router();

//USER BUSINESS LOGIC
router
  .route("/register")
  .post(validateUserRegistration, validateResults, register);
router.route("/login").post(validateUserLogin, validateResults, login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(
    isAuthentication,
    upload.fields([{ name: "file" }, { name: "profilePhoto" }]),
    updateProfile
  );
router
  .route("/save-job")
  .post(
    isAuthentication,
    body("jobId").custom(validateMongooseID),
    validateResults,
    saveJob
  );

router
  .route("/reset-password")
  .post(validateEmailForOTP, validateResults, sendOTPForPass);
router
  .route("/verify-otp")
  .post(
    body("userID").custom(validateMongooseID),
    validateResults,
    validateOTPToChangePass
  );
router
  .route("/change-password")
  .post(validatePasswordReset, validateResults, ChangePassword);

router.route("/subscribe").get(isAuthentication, createOrder);
router.route("/pay-verify").post(isAuthentication, paymentVerification);

router
  .route("/:applicantID") //no express-validator coz it is handled in controller
  .get(isAuthentication, getUserForAdmin);

export default router;
