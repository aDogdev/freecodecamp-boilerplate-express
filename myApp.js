let express = require("express");
let bodyParser = require("body-parser");
require("dotenv").config();
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
  let response;
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ message: response });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;

  res.json({ name: `${firstName} ${lastName}` });
});

app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

app.use(bodyParser.json());

module.exports = app;
