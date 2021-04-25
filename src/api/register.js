const express = require("express");
const router = express.Router();
const playerController = require('../controllers/player');

router.post("/register", playerController.register);

module.exports = router;
