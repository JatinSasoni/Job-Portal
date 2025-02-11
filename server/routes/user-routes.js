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
  .post(isAuthentication, upload.single("file"), userController.updateProfile);

module.exports = router;
