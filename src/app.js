const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
require("./auth/passport");

require("./models/player");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());


// showcase for tests
app.get("/", (req, res) => {
  res.json({
    message: "✨🇧🇷✨",
  });
});


app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
