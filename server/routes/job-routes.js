const { Router } = require("express");
const jobController = require("../controller/Job-Controller");
const isAuthentication = require("../middleware/userAuthentications");

const router = Router();

//JOB BUSINESS LOGIC
router.route("/post").post(isAuthentication, jobController.postJobForAdmin);

router.route("/get").get(jobController.getAllJobs);
router
  .route("/admin/:jobID/get")
  .get(isAuthentication, jobController.getJobInfoByIdForAdmin);

router
  .route("/getadminjobs")
  .get(isAuthentication, jobController.getPostedJobByAdmin);

router.route("/get/:jobID").get(jobController.getJobInfoById);
router
  .route("/remove/:jobID/delete")
  .delete(isAuthentication, jobController.deleteJobByID);

router.route("/saved").get(isAuthentication, jobController.getSavedJobs);
router
  .route("/job-post/:jobID/edit")
  .post(isAuthentication, jobController.editJobPost);

module.exports = router;
