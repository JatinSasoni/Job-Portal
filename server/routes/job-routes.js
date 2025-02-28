const { Router } = require("express");
const jobController = require("../controller/Job-Controller");
const isAuthentication = require("../middleware/userAuthentications");

const router = Router();

//JOB BUSINESS LOGIC
router.route("/post").post(isAuthentication, jobController.postJobForAdmin);

router.route("/get").get(jobController.getAllJobs);

router
  .route("/getadminjobs")
  .get(isAuthentication, jobController.getPostedJobByAdmin);

router.route("/get/:jobID").get(isAuthentication, jobController.getJobInfoById);
router
  .route("/remove/:jobID/delete")
  .delete(isAuthentication, jobController.deleteJobByID);

module.exports = router;
