const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServiceNotes extends DbService {
  // OK! + AUTH
  async getNotes(userId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM notes WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}');`;
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

  // OK! + AUTH
  async getNoteById(userId, noteId) {
    try {
      noteId = parseInt(noteId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM notes WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        id=?;`;
        connection.query(query, [noteId], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }

  // OK! + AUTH
  async insertNote(userId, note) {
    try {
      note = this.sanitizeHtml(note);
      const dateAdded = new Date();
      const post = [note, dateAdded];
      const isPostValid = this.arrayValidator(post);
      if (!isPostValid) return false;
      else {
        const insertId = await new Promise((resolve, reject) => {
          const query = `INSERT INTO notes (fk_user_id,note,relase_date)
          VALUES
          ((select users.id from users where users.unique_id ='${userId}'),
          ?,?);`;
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

  // OK! + AUTH
  async updateNote(userId, noteId, note) {
    try {
      noteId = parseInt(noteId, 10);
      const post = [note, noteId];
      const isPostValid = this.arrayValidator(post);
      if (!isPostValid) return false;
      else {
        const response = await new Promise((resolve, reject) => {
          const query = `UPDATE notes SET note=? WHERE
          fk_user_id=(select users.id from users where users.unique_id ='${userId}')
          AND
          id=?;`;
          connection.query(query, post, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result.changedRows);
          });
        });
        response === 1 ? true : false;
        return [
          {
            id: noteId,
            note: note,
          },
        ];
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // OK! + AUTH
  async deleteNoteById(userId, noteId) {
    try {
      noteId = parseInt(noteId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM notes
        WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        id=?;`;
        connection.query(query, [noteId], (err, result) => {
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
