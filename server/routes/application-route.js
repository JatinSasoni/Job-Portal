const { Router } = require("express");
const applicationController = require("../controller/Application-controller");
const isAuthentication = require("../middleware/userAuthentications");

const router = Router();

//USER BUSINESS LOGIC
router
  .route("/apply/:jobID")
  .get(isAuthentication, applicationController.applyForJob);
router
  .route("/get")
  .get(isAuthentication, applicationController.getAppliedJobsByUser);
router
  .route("/:jobID/applicants")
  .get(isAuthentication, applicationController.appliedApplicationsForJob);
router
  .route("/status/:applicationID/update")
  .post(isAuthentication, applicationController.updateApplicationStatus);
router.route("/get/top-recruiters").get(applicationController.getTopRecruiters);

module.exports = router;
