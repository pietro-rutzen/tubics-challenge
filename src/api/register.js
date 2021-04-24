const express = require("express");
const { checkAuth } = require("../middlewares");
const router = express.Router();
const playerController = require('../controllers/player');

router.post("/register", checkAuth, playerController.register);

module.exports = router;
