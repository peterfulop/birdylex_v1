const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServiceWords extends DbService {
  //OK!
  async getWords(userId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                fk_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.fk_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.fk_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
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

  //OK!
  async getWordById(userId, wordId) {
    try {
      wordId = parseInt(wordId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                fk_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.fk_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.fk_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE
                fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                AND
                id =?;`;
        connection.query(query, [wordId], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }

  //OK!
  async getWordsBySearch(userId, word) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                (SELECT dictionaries.dictionary_name from dictionaries where dictionaries.id = words.fk_dictionary_id) as dictionary,
                word_1,
                word_2,
                (select languages.lang_code from languages where words.fk_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.fk_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE
                fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                AND
                CONCAT(word_1, word_2) LIKE ?;`;
        connection.query(query, ["%" + word + "%"], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }

  //OK!
  async getEqualsWord(userId, dictionaryId, word_1, word_2) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                *
                FROM words
                WHERE
                fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                AND
                fk_dictionary_id = ? AND word_1 = ? AND word_2 = ?;`;
        connection.query(
          query,
          [dictionaryId, word_1, word_2],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }

  // OK!
  async getWordsByDictionaryId(userId, dictionaryId) {
    try {
      dictionaryId = parseInt(dictionaryId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                fk_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.fk_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.fk_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE
                fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                AND
                fk_dictionary_id=?;`;
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

  // OK!
  async getWordsOrderByLimit(userId, limit) {
    limit = parseInt(limit, 10);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT * FROM words 
                WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                ORDER BY id DESC limit ?;`;
        connection.query(query, [limit], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.error(err.message);
    }
  }

  // OK!
  async insertWord(userId, dictionaryId, word_1, word_2, lang_1, lang_2) {
    try {
      const dateAdded = new Date();
      let body = [
        this.sanitizeHtml(dictionaryId),
        this.sanitizeHtml(word_1),
        this.sanitizeHtml(word_2),
        this.sanitizeHtml(lang_1),
        this.sanitizeHtml(lang_2),
        dateAdded,
        dateAdded,
      ];
      const isPostValid = this.arrayValidator(body);
      if (!isPostValid) return false;
      else {
        const data = await new Promise((resolve, reject) => {
          const query = `INSERT INTO words
          (fk_user_id, fk_dictionary_id, word_1, word_2, fk_language_code_1, fk_language_code_2, relase_date,last_modified)
            VALUES ((select users.id from users where users.unique_id ='${userId}'),?,?,?,?,?,?,?);`;
          connection.query(query, body, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result);
            console.log(result);
          });
        });
        return [
          {
            id: data.insertId,
            dictionaryId: dictionaryId,
            word_1: word_1,
            word_2: word_2,
            lang_1: lang_1,
            lang_2: lang_2,
            dateAdded: dateAdded,
            last_modified: dateAdded,
          },
        ];
      }
    } catch (err) {
      console.log(err);
    }
  }

  // OK!
  async updateWord(userId, wordId, word_1, word_2, lang_1, lang_2) {
    try {
      wordId = parseInt(wordId, 10);
      const updateDate = new Date();
      let body = [
        this.sanitizeHtml(word_1),
        this.sanitizeHtml(word_2),
        this.sanitizeHtml(lang_1),
        this.sanitizeHtml(lang_2),
        updateDate,
        wordId,
      ];
      const isPostValid = this.arrayValidator(body);
      if (!isPostValid) return false;
      else {
        const response = await new Promise((resolve, reject) => {
          const query = `UPDATE words SET word_1=?, word_2=?, fk_language_code_1=?, fk_language_code_2=?, last_modified=?
            WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}')
            AND
            id=?;`;
          connection.query(query, body, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result.changedRows);
          });
        });
        response === 1 ? true : false;
        return [
          {
            id: wordId,
            word_1: word_1,
            word_2: word_2,
            lang_1: lang_1,
            lang_2: lang_2,
            relase_date: updateDate,
          },
        ];
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // OK!
  async deleteWordById(userId, wordId) {
    try {
      wordId = parseInt(wordId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM words
        WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        id=?;`;
        connection.query(query, [wordId], (err, result) => {
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

  // OK!
  async deleteWordsByDictionaryId(userId, dictionaryId) {
    try {
      dictionaryId = parseInt(dictionaryId, 10);
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM words
        WHERE
        fk_user_id=(select users.id from users where users.unique_id ='${userId}')
        AND
        fk_dictionary_id=?;`;
        connection.query(query, [dictionaryId], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response >= 1 ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = DbServiceWords;
