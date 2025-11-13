import { Router } from "express";
import isAuthentication from "../middleware/userAuthentications.js";
import { validateJobCreation } from "../validations/jobValidators.js";
import validateResults from "../middleware/validate-result.js";
import {
  deleteJobByID,
  editJobPost,
  getAllJobs,
  getFeaturedJobs,
  getJobInfoById,
  getJobInfoByIdForAdmin,
  getPostedJobByAdmin,
  getSavedJobs,
  postJobForAdmin,
} from "../controller/Job-Controller.js";

const router = Router();

//JOB BUSINESS LOGIC
router
  .route("/post")
  .post(
    isAuthentication,
    validateJobCreation,
    validateResults,
    postJobForAdmin
  );
router
  .route("/server/info")
  .get((req, res) =>
    res.status(200).json({ MESSAGE: "Server live", SUCCESS: true })
  );

router.route("/get").get(getAllJobs);
//mongoose id validated in controller's
router.route("/get/featured").get(getFeaturedJobs);
router.route("/admin/:jobID/get").get(isAuthentication, getJobInfoByIdForAdmin);

router.route("/getadminjobs").get(isAuthentication, getPostedJobByAdmin);

router.route("/get/:jobID").get(getJobInfoById);
router.route("/remove/:jobID/delete").delete(isAuthentication, deleteJobByID);

router.route("/saved").get(isAuthentication, getSavedJobs);
router.route("/job-post/:jobID/edit").post(isAuthentication, editJobPost);

export default router;
