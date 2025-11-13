import { Router } from "express";
import {
  contactController,
  getAllContacts,
} from "../controller/Contact-Controller.js";
import { validateContactForm } from "../validations/contactValidators.js";
import validateResults from "../middleware/validate-result.js";

const router = Router();

router
  .route("/reach-out")
  .post(validateContactForm, validateResults, contactController);
router.route("/get/contacts").get(getAllContacts);
export default router;
