const { Router } = require("express");
const jobController = require("../controller/Job-Controller");
const isAuthentication = require("../middleware/userAuthentications");
const { validateJobCreation } = require("../validations/jobValidators");
const validateResults = require("../middleware/validate-result");

const router = Router();

//JOB BUSINESS LOGIC
router
  .route("/post")
  .post(
    isAuthentication,
    validateJobCreation,
    validateResults,
    jobController.postJobForAdmin
  );
router
  .route("/server/info")
  .get((req, res) =>
    res.status(200).json({ MESSAGE: "Server live", SUCCESS: true })
  );

router.route("/get").get(jobController.getAllJobs);
//mongoose id validated in controller's
router.route("/get/featured").get(jobController.getFeaturedJobs);
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
