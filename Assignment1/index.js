const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // This line parses JSON data in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let users = {
  username: "root",
  password: "Password",
}; // A simple in-memory user store

app.post("/login", (req, res) => {
  console.log(req.body); // Should now log the JSON data correctly

  if (
    users.username === req.body.username &&
    users.password === req.body.password
  ) {
    res.status(200).send({ message: "Success!" });
  } else {
    res.status(400).send({ message: "Invalid credentials!" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
