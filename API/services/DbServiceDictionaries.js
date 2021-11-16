const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServiceDictionaries extends DbService {
  // OK! + AUTH
  async getDictionaries(userId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                Select
                id,
                fk_user_id,
                dictionary_name,
                (select languages.lang_code from languages where dictionaries.fk_language_code_1 = languages.id) as 'lang_prim',
                (select languages.lang_code from languages where dictionaries.fk_language_code_2 = languages.id) as 'lang_sec',
                (select languages.icon from languages where dictionaries.fk_language_code_1 = languages.id) as 'flag_1',
                (select languages.icon from languages where dictionaries.fk_language_code_2 = languages.id) as 'flag_2',
                relase_date
                FROM dictionaries
                WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}');`;
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
  async getDictionaryById(userId, dictionaryId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dictionaries
        WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        id=?;`;
        connection.query(query, [dictionaryId], (err, results) => {
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
  async getDictionaryByName(userId, dictionaryName) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dictionaries
        WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        dictionary_name=?;`;
        connection.query(query, [dictionaryName], (err, results) => {
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
  async insertDictionary(userId, dictionaryName, lang_1, lang_2) {
    try {
      const dateAdded = new Date();
      if (this.sanitizeHtml(dictionaryName).length === 0) {
        dictionaryName = "!illegal chars_";
        dictionaryName += new Date().getTime().toString();
      }
      let post = [
        this.sanitizeHtml(dictionaryName),
        this.sanitizeHtml(lang_1),
        this.sanitizeHtml(lang_2),
        dateAdded,
      ];
      const isPostValid = this.arrayValidator(post);
      if (!isPostValid) return false;
      else {
        const insertId = await new Promise((resolve, reject) => {
          const query = `INSERT INTO dictionaries (fk_user_id, dictionary_name,fk_language_code_1,fk_language_code_2,relase_date)
            VALUES
            ((select users.id from users where users.unique_id ='${userId}'),?,?,?,?);`;
          connection.query(query, post, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result.insertId);
          });
        });
        return [
          {
            id: insertId,
            name: dictionaryName,
            lang_1: lang_1,
            lang_2: lang_2,
          },
        ];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateDictionary(userId, dictionaryId, dictionaryName, lang_1, lang_2) {
    try {
      dictionaryId = parseInt(dictionaryId, 10);
      if (this.sanitizeHtml(dictionaryName).length === 0) {
        dictionaryName = "!illegal chars_";
        dictionaryName += new Date().getTime().toString();
      }
      let post = [
        this.sanitizeHtml(dictionaryName),
        this.sanitizeHtml(lang_1),
        this.sanitizeHtml(lang_2),
        dictionaryId,
      ];
      const isPostValid = this.arrayValidator(post);
      if (!isPostValid) return false;
      else {
        const response = await new Promise((resolve, reject) => {
          const query = `UPDATE dictionaries SET dictionary_name=?, fk_language_code_1=?, fk_language_code_2=?
            WHERE
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
            name: dictionaryName,
            lang_1: lang_1,
            lang_2: lang_2,
          },
        ];
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteDictionaryById(userId, dictionaryId) {
    try {
      dictionaryId = parseInt(dictionaryId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM dictionaries
        WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        id=?;`;
        connection.query(query, [dictionaryId], (err, result) => {
          if (err) reject(new Error(err.message));
          console.log(result);
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

module.exports = DbServiceDictionaries;
