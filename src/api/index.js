const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const middlewares = require("../middlewares");

const router = express.Router();

router.use(loginApi);

router.use(middlewares.checkAuth) // protects the routes below
router.use(registerApi);
//router.use(gameApi);

module.exports = router;
