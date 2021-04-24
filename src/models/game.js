const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Game = sequelize.define("Game", {
    totalMoves: DataTypes.INTEGER,
    currentPlayer: DataTypes.ENUM(1, 2),
    playerOneId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    playerTwoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Game.belongsTo(UserModel, {
    foreignKey: {
        name: "playerOneId"
    },
    as: "playerOne"
});

Game.belongsTo(UserModel, {
    foreignKey: {
        name: "playerTwoId"
    },
    as: "playerTwo"
});

module.exports = Game;
