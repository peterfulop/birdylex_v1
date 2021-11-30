const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

const WordsController = require("../controllers/words");

// OK!! + AUTH


router.get(
  "/",
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
  WordsController.words_get_all
);

// OK! + AUTH
router.get(
  "/bywordid/:wordId",
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
  WordsController.words_get_word
);

// OK! + AUTH
router.get(
  "/byword/:word",
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
  WordsController.words_get_wordsBySearch
);

// OK! + AUTH
router.get(
  "/bydictionaryid/:dictionaryId",
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
  WordsController.words_get_wordsByDictionaryId
);

// OK! + AUTH
router.get(
  "/limit/:limit",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.render("app", { message: res.message });
      return;
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  WordsController.words_get_words_orderByLimit
);

// OK! + AUTH
router.get(
  "/equal/:dictionaryId/:word_1/:word_2",
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
  WordsController.words_get_equalsWord
);

// OK! + AUTH
router.post(
  "/post",
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
  WordsController.words_post_word
);

// OK! + AUTH
router.patch(
  "/patch/:wordId",
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
  WordsController.words_update_word
);

// OK! + AUTH
router.delete(
  "/bywordid/:wordId",
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
  WordsController.words_delete_word
);

// OK! + AUTH
router.delete(
  "/delete/:dictionaryId",
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
  WordsController.words_delete_wordByDictionaryId
);

module.exports = router;
