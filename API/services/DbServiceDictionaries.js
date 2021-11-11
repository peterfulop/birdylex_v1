const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServiceDictionaries extends DbService {


    async getDictionaries() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                Select
                id,
                FK_user_id,
                dictionary_name,
                (select languages.lang_code from languages where dictionaries.FK_language_code_1 = languages.id) as 'lang_prim',
                (select languages.lang_code from languages where dictionaries.FK_language_code_2 = languages.id) as 'lang_sec',
                (select languages.icon from languages where dictionaries.FK_language_code_1 = languages.id) as 'flag_1',
                (select languages.icon from languages where dictionaries.FK_language_code_2 = languages.id) as 'flag_2',
                relase_date
                FROM dictionaries`;
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

    async getDictionaryById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM dictionaries WHERE id=?;`;
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

    async getDictionaryByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM dictionaries WHERE dictionary_name=?;`;
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async insertDictionary(name, lang_1, lang_2) {
        try {
            const dateAdded = new Date();
            if (this.sanitizeHtml(name).length === 0) {
                name = "!illegal chars_";
                name += new Date().getTime().toString();
            }
            let post = [
                1,
                this.sanitizeHtml(name),
                this.sanitizeHtml(lang_1),
                this.sanitizeHtml(lang_2),
                dateAdded,
            ];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const insertId = await new Promise((resolve, reject) => {
                    const query =
                        "INSERT INTO dictionaries (FK_user_id, dictionary_name,FK_language_code_1,FK_language_code_2,relase_date) VALUES (?,?,?,?,?);";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.insertId);
                    });
                });
                return [
                    {
                        id: insertId,
                        name: name,
                        lang_1: lang_1,
                        lang_2: lang_2,
                    },
                ];
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateDictionary(id, name, lang_1, lang_2) {
        try {
            id = parseInt(id, 10);
            if (this.sanitizeHtml(name).length === 0) {
                name = "!illegal chars_";
                name += new Date().getTime().toString();
            }
            let post = [
                this.sanitizeHtml(name),
                this.sanitizeHtml(lang_1),
                this.sanitizeHtml(lang_2),
                id,
            ];
            const isPostValid = this.arrayValidator(post);
            if (!isPostValid) return false;
            else {
                const response = await new Promise((resolve, reject) => {
                    const query =
                        "UPDATE dictionaries SET dictionary_name=?, FK_language_code_1=?, FK_language_code_2=? WHERE id=?;";
                    connection.query(query, post, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result.changedRows);
                    });
                });
                response === 1 ? true : false;
                return [
                    {
                        name: name,
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

    async deleteDictionaryById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM dictionaries WHERE id=?;";
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

module.exports = DbServiceDictionaries;





