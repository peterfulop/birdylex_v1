const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServicePractice extends DbService {
  // OK! + AUTH
  async getPractices(userId) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                dictionary_name,
                start_time,
                end_time,
                relase_date,
                question_count,
                prompter_count,
                skipped_count
                FROM practice
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
  async getPracticeOrderByLimit(userId, limit) {
    limit = parseInt(limit, 10);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
                SELECT
                id,
                dictionary_name,
                start_time,
                end_time,
                relase_date,
                question_count,
                prompter_count,
                skipped_count
                FROM practice
                WHERE fk_user_id=(select users.id from users where users.unique_id ='${userId}')
                ORDER BY relase_date DESC
                limit ?;`;
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

  // OK! + AUTH
  async insertPractice(
    userId,
    dictionary_name,
    start_time,
    end_time,
    question_count,
    prompter_count,
    skipped_count
  ) {
    try {
      const dateAdded = new Date();

      console.log("dictionary_name", dictionary_name);

      let post = [
        dictionary_name,
        start_time,
        end_time,
        dateAdded,
        this.sanitizeHtml(question_count),
        this.sanitizeHtml(prompter_count),
        this.sanitizeHtml(skipped_count),
      ];
      const isPostValid = this.arrayValidator(post);
      if (!isPostValid) return false;
      else {
        const insertId = await new Promise((resolve, reject) => {
          const query = `INSERT INTO practice
            (fk_user_id, dictionary_name, start_time, end_time, relase_date, question_count, prompter_count, skipped_count)
            VALUES ((select users.id from users where users.unique_id ='${userId}'),?,?,?,?,?,?,?);`;
          connection.query(query, post, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result.insertId);
          });
        });
        return [
          {
            id: insertId,
            dictionary_name: dictionary_name,
            start_time: start_time,
            end_time: end_time,
            relase_date: dateAdded,
            question_count: question_count,
            prompter_count: prompter_count,
            skipped_count: skipped_count,
          },
        ];
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DbServicePractice;
