const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.PORT,
});

connection.connect((err) => {
    console.log("fut a connection?!");
    if (err) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
});

module.exports = connection;
