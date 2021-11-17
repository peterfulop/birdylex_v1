const DbService = require("./dbService.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const connection = require("../database/db");
const dotenv = require("dotenv");
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
        const query = `SELECT * FROM users WHERE email ='${email}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          if (result) resolve(result);
        });
      });

      const user = response[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          status: false,
          message: "Az email, vagy a jelszó nem megfelelő!",
        };
      } else {
        const id = user.id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.EXPIRES_IN,
        });

        console.log("The token is:", token);

        const response = await new Promise((resolve, reject) => {
          const query = `UPDATE users SET last_login = '${new Date().toLocaleString()}' WHERE email ='${email}';`;
          connection.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result);
          });
        });
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        return {
          cookieOptions,
          token,
          status: true,
          message: "You are logged in!",
          user,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async authUser(email, password) {
    try {

      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email ='${email}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          if (result) resolve(result);
        });
      });

      const user = response[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          status: false,
          message: "A jelszó nem megfelelő, kérlek próbáld újra!",
        };
      }
      return {
        status: true,
        user,
      };
    }
    catch (error) {
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
      if (
        this.sanitizeHtml(name).length < 5 ||
        this.sanitizeHtml(name).length > 50
      ) {
        console.log("A felhasználónév hossza 5 és 50 karakter között legyen!");
        return {
          status: false,
          message: "A felhasználónév hossza 5 és 50 karakter között legyen!",
        };
      }
      if (!password || password.length < 6 || password.length > 50) {
        console.log("A jelszó legalább 6 karakter hosszúságú legyen!");
        return {
          status: false,
          message: "A jelszó legalább 6 karakter hosszúságú legyen!",
        };
      }
      if (password !== passwordconfirm) {
        console.log("A jelszavak nem egyeznek!");
        return {
          status: false,
          message: "A jelszavak nem egyeznek!",
        };
      } else {
        const response = await new Promise((resolve, reject) => {
          const query = `SELECT email FROM users where email = '${email}';`;
          connection.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result);
          });
        });
        if (response.length > 0) {
          return {
            status: false,
            message: "Az emailcím már használatban van!",
          };
        } else {
          try {
            let hashedPassword = await bcrypt.hash(password, 8);
            let datetime = new Date().toLocaleString();
            let newUser = {
              unique_id: uuid.v4(),
              name: this.sanitizeHtml(name),
              email: this.sanitizeHtml(email),
              password: hashedPassword,
              registered: datetime,
            };
            const response = await new Promise((resolve, reject) => {
              const query = "INSERT INTO users SET ?;";
              connection.query(query, newUser, (error, result) => {
                if (error) {
                  console.log(error);
                }
                if (result) resolve(result.affectedRows);
              });
            });
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
      return {
        status: false,
        message: "Szerver hiba!",
      };
    }
  }

  async updateUser(userId, name, email, isNew, password, passwordconfirm, oldpassword, avatar) {
    try {
      if (!name || !email) {
        return {
          status: false,
          message: "Bizonyos mezők kitöltése kötelező!",
        };
      }
      if (
        this.sanitizeHtml(name).length < 5 ||
        this.sanitizeHtml(name).length > 50
      ) {
        console.log("A felhasználónév hossza 5 és 50 karakter között legyen!");
        return {
          status: false,
          message: "A felhasználónév hossza 5 és 50 karakter között legyen!",
        };
      }

      // Szükséges jelszó változtatás?! 
      if (isNew && password.length < 6 || password.length > 50) {
        console.log("A jelszó legalább 6 karakter hosszúságú legyen!");
        return {
          status: false,
          message: "A jelszó legalább 6 karakter hosszúságú legyen!",
        };
      }
      if (isNew && password !== passwordconfirm) {
        console.log("A jelszavak nem egyeznek!");
        return {
          status: false,
          message: "A jelszavak nem egyeznek!",
        };
      }

      else {
        const response = await new Promise((resolve, reject) => {
          const query = `SELECT email FROM users
          where email = '${email}' AND unique_id !='${userId}';`;
          connection.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            if (result) resolve(result);
          });
        });
        if (response.length > 0) {
          return {
            status: false,
            message: "Az emailcím már használatban van!",
          };
        } else {
          try {

            let hashedPassword;

            if (password) {
              hashedPassword = await bcrypt.hash(password, 8);
            } else {
              hashedPassword = oldpassword;
            }


            name = this.sanitizeHtml(name);
            email = this.sanitizeHtml(email);
            password = hashedPassword;
            avatar = "#";


            const response = await new Promise((resolve, reject) => {
              const query = `UPDATE users SET name='${name}', email='${email}', password='${password}', avatar='${avatar}' WHERE unique_id ='${userId}';`;
              connection.query(query, (error, result) => {
                if (error) {
                  console.log(error);
                }
                if (result) resolve(result.affectedRows);
              });

            });
            if (response > 0) {
              return {
                status: true,
                message: "A módosítás sikeres volt!",
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
      return {
        status: false,
        message: "Szerver hiba!",
      };
    }
  }

  async userIdValidation(token) {
    try {
      const decoded = await new Promise(async (resolve, reject) => {
        resolve(
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              if (err.name === "TokenExpiredError") {
                console.log("Hiba!", err.name);
                return false;
              }
            } else {
              return decoded;
            }
          })
        );
      });
      if (!decoded) {
        return {
          valid: false,
          message: "A munkamenet lejárt, jelentkezz be újra!",
        };
      } else {
        const response = await new Promise((resolve, reject) => {
          const query = `SELECT * FROM users WHERE id = '${decoded.id}';`;
          connection.query(query, (err, result) => {
            if (err) reject(new Error(err.message));
            if (!result) {
              return {
                valid: false,
              };
            } else {
              resolve(result);
            }
          });
        });
        if (response) {
          return {
            valid: true,
            user: response[0],
          };
        }
      }
    } catch (error) {
      return {
        valid: false,
        error,
      };
    }
  }
}

module.exports = DbServiceUsers;
