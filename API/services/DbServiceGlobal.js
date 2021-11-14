const DbService = require("./dbService.js");
const connection = require("../database/db");

class DbServiceGlobal extends DbService {
  // OK! + AUTH
  async getMenuItems() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM main_menu_hu;";
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
  async getLanguages() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM languages;";
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
}

module.exports = DbServiceGlobal;
