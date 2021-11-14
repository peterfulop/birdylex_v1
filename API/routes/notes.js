const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notes");

router.get("/:userId", NotesController.notes_get_all);
// router.get('/:noteId', NotesController.notes_get_note);
router.post("/", NotesController.notes_post_note);
router.patch("/:noteId", NotesController.notes_update_note);
router.delete("/:noteId", NotesController.notes_delete_note);

module.exports = router;
