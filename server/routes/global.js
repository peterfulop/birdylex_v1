const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

const GlobalController = require("../controllers/global");

// OK! + AUTH
router.get(
  "/menu",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  GlobalController.menu_get_menuItems
);

// OK! + AUTH
router.get(
  "/languages",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  GlobalController.language_get_languages
);

module.exports = router;
