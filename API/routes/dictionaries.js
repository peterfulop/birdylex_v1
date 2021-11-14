const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

const DictionariesController = require("../controllers/dictionaries");

// OK! + AUTH
router.get(
  "/",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_get_all
);

// OK! + AUTH
router.get(
  "/bydictionaryid/:dictionaryId",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_get_dictionary
);

// OK! + AUTH
router.get(
  "/bydictionary",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_get_dictionaryByName
);

// OK! + AUTH
router.post(
  "/post",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_post_dictionary
);

router.patch(
  "/patch/:dictionaryId",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_update_dictionary
);

router.delete(
  "/delete/:dictionaryId",
  isLoggedIn,
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("login", { message: res.message });
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  DictionariesController.dictionaries_delete_dictionary
);

module.exports = router;
