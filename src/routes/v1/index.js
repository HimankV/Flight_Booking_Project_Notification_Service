const express = require("express");
const router = express.Router();
const { EmailController } = require("../../controllers");

router.post("/ticket", EmailController.create);

module.exports = router;
