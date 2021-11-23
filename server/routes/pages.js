const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../controllers/auth");

router.get("/", isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("app", {
      user: req.user,
    });
  } else {
    console.log("response message:", res.message);
    res.render("login", { message: res.message });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
