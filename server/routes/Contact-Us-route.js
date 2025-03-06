const { Router } = require("express");
const {
  contactController,
  getAllContacts,
} = require("../controller/Contact-Controller");
const router = Router();

router.route("/reach-out").post(contactController);
router.route("/get/contacts").get(getAllContacts);
module.exports = router;
