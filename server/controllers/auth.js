const DbServiceUsers = require("../services/DbServiceUsers");
const db = new DbServiceUsers();
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const result = db.loginUser(email, password);

    result.then((data) => {
        res.cookie("birdylexlogin", data.token, data.cookieOptions);
        res.status(200).json({
            message: data.message,
            status: data.status,
            user: data.user,
            url: "/",
        });
    });
};

exports.register = (req, res) => {
    const { name, email, password, passwordconfirm } = req.body;
    const result = db.registerUser(name, email, password, passwordconfirm);
    result.then((data) => {
        res.status(200).json({
            data,
        });
    });
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.birdylexlogin) {
        const result = db.userIdValidation(req.cookies.birdylexlogin);
        result.then((data) => {
            if (!data.valid) {
                res.message = data.message;
                return next();
            } else {
                req.user = {
                    unique_id: data.user.unique_id,
                    name: data.user.name,
                    email: data.user.email,
                    registered: new Date(data.user.registered),
                    last_login: new Date(data.user.last_login),
                    avatar: data.user.avatar,
                    password: data.user.password
                };
                return next();
            }
        });
    } else {
        res.message = " A továbblépéshez bejelentkezés szükséges!";
        next();
    }
};

exports.logout = async (reg, res) => {
    res.clearCookie("birdylexlogin");
    res.status(200).redirect("/");
};
