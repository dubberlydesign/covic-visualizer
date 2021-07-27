const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
app.set("trust proxy", 1);

app.use(morgan("dev"));
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "https://dl.airtable.com/"],
      },
    },
  })
);
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/v1", api);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
