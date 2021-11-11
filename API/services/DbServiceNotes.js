const DbService = require("./dbService.js");
const connection = require("../database/db")

class DbServiceNotes extends DbService {
    async getNotes() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM notes;`;
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getNoteById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM notes WHERE id=?;`;
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async insertNote(note) {
        try {
            note = this.sanitizeHtml(note);
            const dateAdded = new Date();
            const post = [note, dateAdded];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const insertId = await new Promise((resolve, reject) => {
                    const query = "INSERT INTO notes (note,relase_date) VALUES (?,?);";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.insertId);
                    });
                });
                return [
                    {
                        id: insertId,
                        note: note,
                        date_added: dateAdded,
                    },
                ];
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateNote(id, note) {
        try {
            id = parseInt(id, 10);
            const post = [note, id];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const response = await new Promise((resolve, reject) => {
                    const query = "UPDATE notes SET note=? WHERE id=?;";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.changedRows);
                    });
                });
                response === 1 ? true : false;
                return [
                    {
                        id: id,
                        note: note,
                    },
                ];
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async deleteNoteById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM notes WHERE id=?;";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = DbServiceNotes;
