const DbService = require("./dbService.js");
const connection = require("../database/db")

class DbServicePractice extends DbService {
    async getPractices() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                (SELECT dictionaries.dictionary_name from dictionaries where dictionaries.id = practice.FK_dictionary_id) as name,
                start_time,
                end_time,
                relase_date,
                question_count,
                prompter_count,
                skipped_count
                FROM practice;`;
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

    async getPracticeOrderByLimit(limit) {
        limit = parseInt(limit, 10);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                (SELECT dictionaries.dictionary_name from dictionaries where dictionaries.id = practice.FK_dictionary_id) as name,
                start_time,
                end_time,
                relase_date,
                question_count,
                prompter_count,
                skipped_count
                FROM practice
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

    async insertPractice(
        FK_dictionary_id,
        start_time,
        end_time,
        question_count,
        prompter_count,
        skipped_count
    ) {
        try {
            const dateAdded = new Date();

            let post = [
                FK_dictionary_id,
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
                    const query =
                        "INSERT INTO practice (FK_dictionary_id, start_time, end_time, relase_date, question_count, prompter_count, skipped_count) VALUES (?,?,?,?,?,?,?);";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.insertId);
                    });
                });
                return [
                    {
                        id: insertId,
                        FK_dictionary_id: FK_dictionary_id,
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

