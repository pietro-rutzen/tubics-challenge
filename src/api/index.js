const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const gamesApi = require("./games");
const middlewares = require("../middlewares");

const router = express.Router();

router.use(loginApi);
router.use(registerApi);

router.use(middlewares.checkAuth) // protects the routes below
router.use(gamesApi);

module.exports = router;
