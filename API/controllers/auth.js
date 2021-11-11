const DbServiceUsers = require("../services/DbServiceUsers");
const db = new DbServiceUsers;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {

    const { email, password } = req.body;
    const result = db.loginUser(email, password);

    result.then(data => {
        res.cookie("birdylexlogin", data.token, data.cookieOptions);
        res.status(200).json({
            message: data.message,
            status: data.status,
            user: data.user,
            url: "/app"
        })
    })

};

exports.register = (req, res) => {

    const { name, email, password, passwordconfirm } =
        req.body;

    const result = db.registerUser(name, email, password, passwordconfirm);
    result.then(data => {
        console.log(data);
        res.status(200).json({
            data
        })
    })
};

exports.isLoggedIn = async (req, res, next) => {

    if (req.cookies.birdylexlogin) {

        const result = db.userIdValidation(req.cookies.birdylexlogin);
        result.then(data => {
            if (!data) return next();
            else {
                req.user = {
                    id : data.user.id,
                    username : data.user.username,
                    email: data.user.email,
                    registered : data.user.registered,
                    last_login : data.user.last_login
                };
                return next();
            }
        })

    } else {
        next();
    }
}