const DbServiceNotes = require("../services/DbServiceNotes");
var db = new DbServiceNotes();

// OK! + AUTH
exports.notes_get_all = (req, res) => {
  const { userId } = req.body;
  const result = db.getNotes(userId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "notes",
          data,
        });
      } else {
        res.status(200).json({
          count: data.length,
          info: "no result",
          data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.notes_get_note = (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.body;
  const result = db.getNoteById(userId, noteId);
  result
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          data: data,
        });
      } else {
        res.status(404).json({ message: "Not exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.notes_post_note = (req, res) => {
  const { userId, note } = req.body;
  const result = db.insertNote(userId, note);
  result
    .then((data) => {
      if (data) {
        res.status(201).json({
          messsage: "Data added!",
          data: data,
        });
      } else {
        res.status(404).json({
          messsage: "Some error!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.notes_update_note = (req, res) => {
  const { noteId } = req.params;
  const { userId, note } = req.body;
  const result = db.updateNote(userId, noteId, note);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          messsage: "Data updated!",
          data: data,
        });
      } else {
        res.status(404).json({
          messsage: "Some error!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.notes_delete_note = (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.body;
  const result = db.deleteNoteById(userId, noteId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Note has been deleted!",
        });
      } else {
        res.status(404).json({ message: "Not exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
