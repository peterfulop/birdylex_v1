const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const child_process = require('child_process');

const host = dbConfig.HOST;
const user = dbConfig.USER;
const password = dbConfig.PASSWORD;
const database = dbConfig.DATABASE;

const Importer = require('mysql-import');
const importer = new Importer({ host, user, password, database });

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: dbConfig.PORT,
});


const importDB = () => {
    importer.onProgress(progress => {
        var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
        console.log(`${percent}% Completed`);
    });
    importer.import('./server/database/birdylex_back.sql').then(() => {
        var files_imported = importer.getImported();
        console.log(`${files_imported.length} SQL file(s) imported.`);
        console.log("Újraindítás szükséges!");

    }).catch(err => {
        console.error(err);
    });
}

connection.connect(async (err) => {

    if (err) {
        if (err.errno === 1049) {
            console.log("Az adatbázis nem létezik, létrehozás folyamatban...");

            var con = mysql.createConnection({
                host: host,
                user: user,
                password: password,
            });
            const response = await new Promise((resolve, reject) => {
                const query = `CREATE DATABASE ${database};`;
                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            if (response.affectedRows > 0) importDB();
            con.destroy();

        }

    } else {
        console.log("MYSQL Connected...");
    }
});

module.exports = connection;

