const express = require('express');
const { isLoggedIn } = require('../controllers/auth.js');
const router = express.Router();

const UserController = require('../controllers/user.js');


router.get("/active", isLoggedIn,
    (req, res, next) => {
        if (!req.user) {
            console.log("response message:", res.message);
            res.redirect("/");
        } else {
            console.log(req.body);
            req.body.user = req.user;
            next();
        }
    }, UserController.users_get_userById);


router.post("/control", isLoggedIn,
    (req, res, next) => {
        if (!req.user) {
            console.log("response message:", res.message);
            res.redirect("/");
        } else {
            req.body.userId = req.user.unique_id;
            next();
        }
    }, UserController.users_control_user);


router.patch("/patch", isLoggedIn,
    (req, res, next) => {
        if (!req.user) {
            console.log("response message:", res.message);
            res.redirect("/");
        } else {
            console.log(req.user);
            req.body.userId = req.user.unique_id;
            req.body.oldpassword = req.user.password;
            next();
        }
    }, UserController.users_update_user);

// router.get('/search/:email', UserController.users_get_userByEmail);
// router.get('/equal/:search', UserController.users_get_name_email);
// router.get('/login/:check', UserController.user_login);
// router.post('/', UserController.users_post_user);
// router.patch('/:userId');
// router.delete('/:userId');

module.exports = router;