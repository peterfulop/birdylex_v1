const DbService = require("./dbService.js");
const connection = require("../database/db")

class DbServiceWords extends DbService {
    async getWords() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                FK_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.FK_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.FK_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words;`;
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

    async getWordById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                FK_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.FK_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.FK_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE id =?;`;
                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getWordsBySearch(word) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                (SELECT dictionaries.dictionary_name from dictionaries where dictionaries.id = words.FK_dictionary_id) as dictionary,
                word_1,
                word_2,
                (select languages.lang_code from languages where words.FK_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.FK_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE CONCAT(word_1, word_2) LIKE ?
                ;`;
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

    async getEqualsWord(dictionaryId, word_1, word_2) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                *
                FROM words
                WHERE
                FK_dictionary_id = ? AND word_1 = ? AND word_2 = ?;`;
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

    async getWordsByDictionaryId(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT
                id,
                FK_dictionary_id as 'dictionary_id',
                word_1,
                word_2,
                (select languages.lang_code from languages where words.FK_language_code_1 = languages.id) as 'lang_1',
                (select languages.lang_code from languages where words.FK_language_code_2 = languages.id) as 'lang_2',
                relase_date,
                last_modified
                FROM words
                WHERE FK_dictionary_id=?;`;
                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getWordsOrderByLimit(limit) {
        limit = parseInt(limit, 10);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                SELECT * FROM words ORDER BY id DESC limit ?;`;
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

    async insertWord(dictionaryId, word_1, word_2, lang_1, lang_2) {
        try {
            const dateAdded = new Date();

            let post = [
                this.sanitizeHtml(dictionaryId),
                this.sanitizeHtml(word_1),
                this.sanitizeHtml(word_2),
                this.sanitizeHtml(lang_1),
                this.sanitizeHtml(lang_2),
                dateAdded,
                dateAdded,
            ];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const insertId = await new Promise((resolve, reject) => {
                    const query =
                        "INSERT INTO words (FK_dictionary_id, word_1, word_2, FK_language_code_1, FK_language_code_2, relase_date,last_modified) VALUES (?,?,?,?,?,?,?);";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.insertId);
                    });
                });
                return [
                    {
                        id: insertId,
                        dictionaryId: dictionaryId,
                        word_1: word_1,
                        word_2: word_2,
                        lang_1: lang_1,
                        lang_2: lang_2,
                        dateAdded: dateAdded,
                        dateAdded: dateAdded,
                    },
                ];
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateWord(id, word_1, word_2, lang_1, lang_2) {
        try {
            id = parseInt(id, 10);
            const updateDate = new Date();
            let post = [
                this.sanitizeHtml(word_1),
                this.sanitizeHtml(word_2),
                this.sanitizeHtml(lang_1),
                this.sanitizeHtml(lang_2),
                updateDate,
                id,
            ];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const response = await new Promise((resolve, reject) => {
                    const query =
                        "UPDATE words SET word_1=?, word_2=?, FK_language_code_1=?, FK_language_code_2=?, last_modified=? WHERE id=?;";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.changedRows);
                    });
                });
                response === 1 ? true : false;
                return [
                    {
                        id: id,
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

    async deleteWordById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM words WHERE id=?;";
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

    async deleteWordsByDictionaryId(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM words WHERE FK_dictionary_id=?;";
                connection.query(query, [id], (err, result) => {
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