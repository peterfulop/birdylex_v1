const DbServiceNotes = require("../services/DbServiceNotes");
var db = new DbServiceNotes();

exports.notes_get_all = (req, res) => {
    const result = db.getNotes();
    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    count: data.length,
                    info: "notes",
                    data: data
                })
            } else {
                res.status(404).json({ message: 'No items found!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};


exports.notes_get_note = (req, res) => {
    const { noteId } = req.params;
    const result = db.getNoteById(noteId);
    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    data: data
                })
            }
            else {
                res.status(404).json({ message: 'Not exists ID!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};


exports.notes_post_note = (req, res) => {
    const { note } = req.body;
    const result = db.insertNote(note);
    result
        .then(data => {
            if (data) {
                res.status(201).json({
                    messsage: 'Data added!',
                    data: data
                })
            }
            else {
                res.status(404).json({
                    messsage: 'Some error!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};


exports.notes_update_note = (req, res) => {
    const { noteId, note } = req.body;
    const result = db.updateNote(noteId, note);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    messsage: 'Data updated!',
                    data: data
                })
            }
            else {
                res.status(404).json({
                    messsage: 'Some error!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};


exports.notes_delete_note = (req, res) => {
    const { noteId } = req.params;
    const result = db.deleteNoteById(noteId);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Note has been deleted!'
                })
            }
            else {
                res.status(404).json({ message: 'Not exists ID!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};