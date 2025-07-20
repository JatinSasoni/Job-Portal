const { Router } = require("express");
const userController = require("../controller/User-Controller");
const isAuthentication = require("../middleware/userAuthentications");
const upload = require("../middleware/multer");
const {
  validateUserRegistration,
  validateUserLogin,
  validateMongooseID,
  validateEmailForOTP,
  validatePasswordReset,
} = require("../validations/userValidators");
const validateResults = require("../middleware/validate-result");
const { body } = require("express-validator");

const router = Router();

//USER BUSINESS LOGIC
router
  .route("/register")
  .post(validateUserRegistration, validateResults, userController.register);
router
  .route("/login")
  .post(validateUserLogin, validateResults, userController.login);
router.route("/logout").get(userController.logout);
router
  .route("/profile/update")
  .post(
    isAuthentication,
    upload.fields([{ name: "file" }, { name: "profilePhoto" }]),
    userController.updateProfile
  );
router
  .route("/save-job")
  .post(
    isAuthentication,
    body("jobId").custom(validateMongooseID),
    validateResults,
    userController.saveJob
  );

router
  .route("/reset-password")
  .post(validateEmailForOTP, validateResults, userController.sendOTPForPass);
router
  .route("/verify-otp")
  .post(
    body("userID").custom(validateMongooseID),
    validateResults,
    userController.validateOTPToChangePass
  );
router
  .route("/change-password")
  .post(validatePasswordReset, validateResults, userController.ChangePassword);

router.route("/subscribe").get(isAuthentication, userController.createOrder);
router
  .route("/pay-verify")
  .post(isAuthentication, userController.paymentVerification);

router
  .route("/:applicantID") //no express-validator coz it is handled in controller
  .get(isAuthentication, userController.getUserForAdmin);

module.exports = router;
