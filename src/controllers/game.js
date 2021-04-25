const Game = require("../models/game");
const Player = require("../models/player");

// exports.move = (req, res) => {

// }

exports.new = async (req, res) => {

 const { playerOneName, playerTwoName } = req.body
 
 const playerOne = await Player.findOne({ where: { fullName: playerOneName } }).catch(
  (err) => {
    console.log("Error: ", err);
  }
 );

 const playerTwo = await Player.findOne({ where: { fullName: playerTwoName } }).catch(
  (err) => {
    console.log("Error: ", err);
  }
 );

 const newGame = new Game({ playerOneId: playerOne.id, playerTwoId: playerTwo.id });

 const savedGame = await newGame.save().catch((err) => {
   console.log("Error: ", err);
   res.status(500).json({ error: "Cannot start Game at the moment!" });
 });

 if (savedGame) res.json({ message: `Game started with id: ${savedGame.id}! ${playerOne.fullName} goes first!`});
}

