import { Router } from "express";
import {
  appliedApplicationsForJob,
  applyForJob,
  getAppliedJobsByUser,
  getTopRecruiters,
  updateApplicationStatus,
} from "../controller/Application-controller.js";
import isAuthentication from "../middleware/userAuthentications.js";

const router = Router();

//USER BUSINESS LOGIC
router.route("/apply/:jobID").get(isAuthentication, applyForJob);
router.route("/get").get(isAuthentication, getAppliedJobsByUser);
router
  .route("/:jobID/applicants")
  .get(isAuthentication, appliedApplicationsForJob);
router
  .route("/status/:applicationID/update")
  .post(isAuthentication, updateApplicationStatus);
router.route("/get/top-recruiters").get(getTopRecruiters);

export default router;
