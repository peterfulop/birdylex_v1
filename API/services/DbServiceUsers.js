const DbService = require("./dbService.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const connection = require("../database/db");
const dotenv = require('dotenv');
dotenv.config();


class DbServiceUsers extends DbService {

    async loginUser(email, password) {

        try {
            if (!email || !password) {
                return {
                    status: false,
                    message: "Login - Minden mező kitöltése kötelező!",
                };
            }
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE email ='${email}';`
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    if (result) resolve(result);
                })
            })

            const user = response[0];

            if (!response || !(await bcrypt.compare(password, user.password))) {
                return {
                    status: false,
                    message: "Az email, vagy a jelszó nem megfelelő!",
                };
            } else {

                const id = user.id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

                console.log("The token is:", token);

                const response = await new Promise((resolve, reject) => {
                    const query = `UPDATE users SET last_login = '${new Date().toLocaleString()}' WHERE email ='${email}';`
                    connection.query(query, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result);
                    })
                })
                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                return {
                    cookieOptions,
                    token,
                    status: true,
                    message: "You are logged in!",
                    user
                };
            }

        } catch (error) {
            console.log(error);
        }
    }

    async registerUser(name, email, password, passwordconfirm) {

        try {

            if (!name || !email || !password || !passwordconfirm) {
                console.log("Minden mező kitöltése kötelező!");
                return {
                    status: false,
                    message: "Minden mező kitöltése kötelező!",
                };
            }
            if (!password || passwordconfirm.length < 6) {
                console.log("A jelszó legalább 6 karakter hosszúságú legyen!");
                return {
                    status: false,
                    message: "A jelszó legalább 6 karakter hosszúságú legyen!",
                };
            } if (password !== passwordconfirm) {
                console.log("A jelszavak nem egyeznek!");
                return {
                    status: false,
                    message: "A jelszavak nem egyeznek!",
                };
            } else {


                const response = await new Promise((resolve, reject) => {
                    const query = `SELECT email FROM users where email = '${email}';`
                    connection.query(query, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result);
                    })
                })
                if (response.length > 0) {
                    return {
                        status: false,
                        message: "That email is allready in use!",
                    };
                }
                else {

                    try {

                        let hashedPassword = await bcrypt.hash(password, 8);
                        let datetime = new Date().toLocaleString();
                        let newUser = {
                            id: uuid.v4(),
                            username: this.sanitizeHtml(name),
                            email: this.sanitizeHtml(email),
                            password: hashedPassword,
                            registered: datetime,
                        };
                        const response = await new Promise((resolve, reject) => {
                            const query = "INSERT INTO users SET ?;"
                            connection.query(query, newUser, (error, result) => {
                                if (error) {
                                    console.log(error);
                                }
                                if (result) resolve(result.affectedRows);
                            });
                        })
                        if (response > 0) {
                            return {
                                status: true,
                                message: "A regisztráció sikeres volt!",
                            };
                        } else {
                            throw new Error();
                        }

                    } catch (error) {
                        console.log(error);
                        return {
                            status: false,
                            message: "Szerver hiba!",
                        };
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    async userIdValidation(token) {

        const decoded = await new Promise(async (resolve) => {
            resolve(jwt.verify(token, process.env.JWT_SECRET));
        })
        console.log(decoded);

        const response = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id = '${decoded.id}';`
            connection.query(query, (err, result) => {
                if (err) reject(new Error(err.message));
                if (!result) {
                    return {
                        valid: false
                    }
                } else {
                    resolve(result);
                }
            })
        })
        console.log(response);

        if (response) {
            return {
                user: response[0]
            }
        }




        // if (req.cookies.jwt) {
        //     try {
        //         // 1) Verify the token
        //         // const decoded = await new Promise(async (resolve) => {
        //         //     resolve(jwt.verify(req.cookies.jwt, process.env.JWT_SECRET));
        //         // })
        //         // console.log(decoded);

        //         // 2) Check if user id exists
        //         db.query(`SELECT * FROM users WHERE id = '${decoded.id}';`, (error, result) => {
        //             if (!result) {
        //                 return next();
        //             } else {
        //                 req.user = result[0];
        //                 return next();
        //             }
        //         })
        //     } catch (error) {
        //         console.log(error);
        //         return next();
        //     }
        // } else {
        //     next();
        // }
    }








    async getUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users;`;
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



    async getUserById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE id=?`;
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE email=?`;
                connection.query(query, [email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log("response:", response);
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getUserByName(username) {
        username = this.sanitizeHtml(username);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE username=?`;
                connection.query(query, [username], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getUserByNameAndEmail(username, email) {
        username = this.sanitizeHtml(username);
        email = this.sanitizeHtml(email);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE username=? AND email=?`;
                connection.query(query, [username, email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            })
            return response;
        } catch (err) {
            console.error(err.message);
        }
    }

    async getUserByEmailAndPassword(email, password) {
        // const sha256Hasher = crypto.createHmac("sha256", process.env.KEY);
        // password = sha256Hasher.update(password).digest("hex");
        // try {
        //     return await new Promise((resolve, reject) => {
        //         const query = `SELECT * FROM users WHERE email=? AND password=?`;
        //         connection.query(query, [email, password], async (err, result) => {
        //             if (err) {
        //                 reject(new Error(err.message));
        //                 return;
        //             }

        //             if (result.length) {
        //                 let token = jwt.sign(
        //                     {
        //                         username: result[0].username,
        //                         userId: result[0].id,
        //                     },
        //                     process.env.KEY,
        //                     { expiresIn: "1d" }
        //                 );
        //                 resolve([
        //                     {
        //                         status: true,
        //                         msg: "Logged In!",
        //                         token,
        //                         user: {
        //                             username: result[0].username,
        //                             userId: result[0].id,
        //                             email: result[0].email,
        //                             relase_date: result[0].relase_date,
        //                             last_modified: result[0].last_modified,
        //                         },
        //                     },
        //                 ]);
        //             } else {
        //                 return resolve();
        //             }
        //         });
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
    }

    async insertUser(username, email, password) {
        const sha256Hasher = crypto.createHmac("sha256", process.env.KEY);
        password = sha256Hasher.update(password).digest("hex");

        try {
            username = this.sanitizeHtml(username);
            const dateAdded = new Date();
            const userId = uuidv4();
            const user = [userId, username, email, password, dateAdded, dateAdded];
            const isPostValid = this.arrayValidator(user);
            if (!isPostValid) return false;
            else {
                const newUser = await new Promise((resolve, reject) => {
                    const query =
                        "INSERT INTO users (id,username, email, password, relase_date, last_modified) VALUES (?,?,?,?,?,?);";
                    connection.query(query, user, (err, result) => {
                        if (err) reject(new Error(err.message));
                        if (result) resolve(result);
                    });
                });
                return [
                    {
                        id: userId,
                        username: username,
                        email: email,
                        password: password,
                        date_added: dateAdded,
                    },
                ];
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DbServiceUsers;

