const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

const NotesController = require("../controllers/notes");

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
  NotesController.notes_get_all
);

// OK! + AUTH
router.get(
  "/:noteId",
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
  NotesController.notes_get_note
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
  NotesController.notes_post_note
);

// OK! + AUTH
router.patch(
  "/patch/:noteId",
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
  NotesController.notes_update_note
);

// OK! + AUTH
router.delete(
  "/delete/:noteId",
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
  NotesController.notes_delete_note
);

module.exports = router;
