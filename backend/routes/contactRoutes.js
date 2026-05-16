const express = require("express");
const router = express.Router();

const { sendContactEmail } = require("../controller/contactController");

router.post("/us", sendContactEmail);

module.exports = router;