const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Player = require("./player");

const Game = sequelize.define("Game", {
    moves: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    currentPlayer: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    board: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        defaultValue: [
            0,0,0,
            0,0,0,
            0,0,0
        ]
    },
    status: {
        type: DataTypes.ENUM('in_progress','finished'),
        defaultValue: 'in_progress'
    },
    playerOneId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    playerTwoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    winner: DataTypes.STRING,
    loser: DataTypes.STRING
});

Game.belongsTo(Player, {
    foreignKey: {
        name: "playerOneId"
    },
    as: "playerOne"
});

Game.belongsTo(Player, {
    foreignKey: {
        name: "playerTwoId"
    },
    as: "playerTwo"
});

module.exports = Game;
