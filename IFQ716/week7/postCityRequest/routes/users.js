var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  // 1. Retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Email and password are required",
    });
    return;
  }

  // 2. Determine if user already exists in table
  const queryUser = req.db.from("users").select("*").where("email", "=", email);

  queryUser.then((users) => {
    if (users.length === 0) {
      console.log("User does not exist");
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }

    //compare password with hash
    const user = users[0];
    return bcrypt.compare(password, user.hash).then((match) => {
      if (!match) {
        console.log("Passwords do not match");
        return;
      }
      

      // create JWT token
      const expires_in = 60 * 60 * 24;
      const exp = Math.floor(Date.now() / 1000) + expires_in;
      const token = jwt.sign({ exp }, process.env.JWT_SECRET);

      // Set the token in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // HTTPSならtrueに
        sameSite: "lax",
        maxAge: expires_in * 1000,
      });

      res.status(200).json({
        token,
        token_type: "Bearer",
        expires_in,
      });
    });
  });
});

router.post("/register", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required" });
  }

  const queryUser = req.db.from("users").select("*").where("email", "=", email);
  queryUser
    .then((users) => {
      if (users.length > 0) {
        console.log("User already exists");
        return res
          .status(409)
          .json({ error: true, message: "User already exists" });
      }

      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      return req.db.from("users").insert({ email, hash });
    })
    .then((result) => {
      if (result) {
        res
          .status(201)
          .json({ success: true, message: "User registered successfully" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, message: "Internal server error" });
    });
});

module.exports = router;
