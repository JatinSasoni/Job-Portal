const { Router } = require("express");
const userController = require("../controller/User-Controller");
const isAuthentication = require("../middleware/userAuthentications");
const upload = require("../middleware/multer");

const router = Router();

//USER BUSINESS LOGIC
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);
router
  .route("/profile/update")
  .post(
    isAuthentication,
    upload.fields([{ name: "file" }, { name: "profilePhoto" }]),
    userController.updateProfile
  );
router.route("/save-job").post(isAuthentication, userController.saveJob);
router.route("/reset-password").post(userController.sendOTPForPass);
router.route("/verify-otp").post(userController.validateOTPToChangePass);
router.route("/change-password").post(userController.ChangePassword);

router.route("/subscribe").get(isAuthentication, userController.createOrder);
router
  .route("/pay-verify")
  .post(isAuthentication, userController.paymentVerification);

router
  .route("/:applicantID")
  .get(isAuthentication, userController.getUserForAdmin);

module.exports = router;
