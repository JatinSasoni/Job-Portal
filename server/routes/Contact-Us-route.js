const { Router } = require("express");
const contactController = require("../controller/Contact-Controller");
const router = Router();

router.route("/reach-out").post(contactController);
module.exports = router;
