// reference use cookie and JWT : https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn
// https://medium.com/@sajaldewangan/authentication-using-cookies-with-jwt-in-expressjs-900467c3b8d3

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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      Error: true,
      Message: "Request body incomplete, both email and password are required",
    });
  }
  // 2. Determine if user already exists in table
  const queryUser = req.db.from("users").select("*").where("email", email);
  queryUser.then((users) => {
    if (users.length === 0) {
      console.log("User does not exist");
      return res.status(404).json({
        Error: true,
        Message: "User does not exist",
      });
    }

    // compare password with hash
    const user = users[0];
    return bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (!match) {
          console.log("Passwords do not match");
          return res.status(401).json({
            Error: true,
            Message: "Incorrect password or email",
          });
        }

        // create JWT token
        const expires_in = 60 * 60 * 24; // 1 day
        const exp = Math.floor(Date.now() / 1000) + expires_in;
        const token = jwt.sign(
          { email: user.email, exp },
          process.env.JWT_SECRET
        );

        // Set the token in a cookie
        res
          .cookie("token", token, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: expires_in * 1000, // Convert seconds to milliseconds
          })
          .status(200)
          .json({
            token,
            token_type: "Bearer",
            expires_in,
          });
      })
      .catch((err) => {
        console.error("Error comparing passwords:", err);
        res.status(500).json({
          Error: true,
          Message: "Internal server error",
        });
      });
  });
});

router.post("/register", function (req, res, next) {
  // 1. Retrieve email and password from req.body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      Error: true,
      Message: "Request body incomplete, both email and password are required",
    });
  }
  // 2. Determine if user already exists in table
  const queryUsers = req.db.from("users").select("email").where("email", email);

  // 2.1 If user exists, return error
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        return res
          .status(409)
          .json({ Error: true, Message: "User already exists" });
      }

      // 2.2 If user does not exist, insert into table
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      return req.db("users").insert({
        email,
        password: hash,
      });
    })
    .then(() => {
      res.status(201).json({ Error: false, Message: "User created" });
    });
});
module.exports = router;
