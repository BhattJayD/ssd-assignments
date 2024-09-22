const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Pre-hashed password for "Password" using bcrypt
const hashedPassword =
  "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a"; // bcrypt hash of "Password"

let users = {
  username: "root",
  password: hashedPassword,
};

app.post("/login", async (req, res) => {
  console.log(req.body);

  if (
    req.body.username === users.username &&
    req.body.password === users.password
  ) {
    res.status(200).send({ message: "Success!" });
  } else {
    res.status(400).send({ message: "Invalid credentials!" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
