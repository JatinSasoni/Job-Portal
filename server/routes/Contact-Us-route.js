const { Router } = require("express");
const {
  contactController,
  getAllContacts,
} = require("../controller/Contact-Controller");
const { validateContactForm } = require("../validations/contactValidators");
const validateResults = require("../middleware/validate-result");
const router = Router();

router
  .route("/reach-out")
  .post(validateContactForm, validateResults, contactController);
router.route("/get/contacts").get(getAllContacts);
module.exports = router;
