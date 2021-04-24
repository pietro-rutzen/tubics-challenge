const express = require("express");
const Player = require("../models/player");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const playerWithEmail = await Player.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!playerWithEmail) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  }

  bcrypt.compare(password, playerWithEmail.password, (err, result) => {
    if (err) {
        return res.status(400).json({
            message: "Authentication has failed"
        }).send();
    }
    console.log(result)
    if (result) {
        const jwtToken = jwt.sign(
            {
              email: playerWithEmail,
              id: playerWithEmail.id
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h"
            }
        );
        return res.json({
            message: "Auth successful",
            token: jwtToken
        }).send();
    }
    res.status(401).json({ message: "Email or password does not match!" }).send();
  });
});

module.exports = router;
