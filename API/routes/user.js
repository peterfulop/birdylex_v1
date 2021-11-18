const express = require('express');
const { isLoggedIn } = require('../controllers/auth.js');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require("uuid");

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



router.post("/avatar", isLoggedIn,
    (req, res, next) => {
        if (!req.user) {
            console.log("response message:", res.message);
            res.redirect("/");
        } else {
            req.body.userId = req.user.unique_id;
            if (req.files) {
                const file = req.files.profile;
                const fileName = req.files.profile.name;
                const g = /(.*)\.(.+)/;
                const ext = fileName.match(g)[2];
                // const ext = fileName.split('.').pop();

                const unique_name = `${req.user.unique_id}.${ext}`;

                file.mv("./public/images/avatars/" + unique_name, (err) => {
                    if (err) {
                        res.send(err);
                        return;
                    } else {
                        req.body.avatarId = unique_name;
                        next();
                    }
                });
            } else {
                return next();
            }
        }
    }, UserController.users_update_avatar);


router.post("/avatar/preview", isLoggedIn,
    (req, res) => {
        if (!req.user) {
            console.log("response message:", res.message);
            res.redirect("/");
        } else {
            req.body.userId = req.user.unique_id;
            if (req.files) {
                const file = req.files.profile;
                const fileName = req.files.profile.name;
                const g = /(.*)\.(.+)/;
                const ext = fileName.match(g)[2];

                const newName = uuid.v4();
                const unique_name = `${newName}.${ext}`;

                const directory = './public/images/prev/';

                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });

                file.mv(directory + unique_name, (err) => {
                    if (err) {
                        res.send(err);
                        return;
                    } else {
                        res.status(200).json({
                            message: "Előnézet",
                            img: unique_name
                        })
                    }
                });
            }

        }
    })




// router.post("/avatar/preview", (req, res) => {
//     if (req.files) {
//         const file = req.files.profile;
//         const fileName = req.files.profile.name;
//         const g = /(.*)\.(.+)/;
//         const ext = fileName.match(g)[2];
//         const unique_name = `${req.user.unique_id}.${ext}`;

//         file.mv("./public/images/avatars/prev/" + unique_name, (err) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.status(200).json({
//                     message: "Feltöltés kész."
//                 })
//             }
//         });
//     }

// })

// router.get('/search/:email', UserController.users_get_userByEmail);
// router.get('/equal/:search', UserController.users_get_name_email);
// router.get('/login/:check', UserController.user_login);
// router.post('/', UserController.users_post_user);
// router.patch('/:userId');
// router.delete('/:userId');

module.exports = router;