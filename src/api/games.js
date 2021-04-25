const express = require("express");
const router = express.Router();
const gameController = require('../controllers/game');

//router.get("/games", gameController.all);

//router.get("/games/:gameId", gameController.one);

router.post("/games", gameController.new);

// router.put("/games/:gameId", gameController.one);

// router.delete("/games/:gameId", async (req, res) => {

// });

module.exports = router;

