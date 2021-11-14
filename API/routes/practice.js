const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

const PracticeController = require("../controllers/practice");

// OK! + AUTH
router.get(
  "/",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  PracticeController.practice_get_all
);

// OK! + AUTH
router.get(
  "/limit/:limit",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  PracticeController.practice_get_practice_orderByLimit
);

// OK! + AUTH
router.post(
  "/post",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  PracticeController.practice_post_practice_result
);

module.exports = router;
