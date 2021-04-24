const Player = require("../models/player");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  const alreadyExistsPlayer = await Player.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsPlayer) {
    return res.status(409).json({ message: "Player with that email already exists!" });
  }

  let hashedPassword = await bcrypt.hash(password, 10)
  const newPlayer = new Player({ fullName, email, password: hashedPassword });

  const savedPlayer = await newPlayer.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register player at the moment!" });
  });

  if (savedPlayer) res.json({ message: "Thanks for registering!" });
};