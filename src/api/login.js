const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  }

  bcrypt.compare(password, userWithEmail.password, (err, result) => {
    if (err) {
        return res.status(400).json({
            message: "Authentication has failed"
        }).send();
    }
    console.log(result)
    if (result) {
        const jwtToken = jwt.sign(
            {
              email: userWithEmail,
              id: userWithEmail.id
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
