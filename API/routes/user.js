const express = require('express');
const { isLoggedIn } = require('../controllers/auth.js');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require("uuid");
const sharp = require('sharp');

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

                const unique_name = `${req.user.unique_id}.${ext}`;

                const basePath = `./public/images/users/${req.user.unique_id}/avatar/`;

                if (!fs.existsSync(basePath)) {
                    fs.mkdirSync(basePath);
                }

                const currAvatar = basePath + req.user.unique_id + ".*";
                fs.unlink(currAvatar, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                });


                file.mv(basePath + unique_name, (err) => {
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
    async (req, res) => {

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
                const rnd = uuid.v4();
                const unique_name = `${rnd}.${ext}`;
                const basePath = `./public/images/users/${req.user.unique_id}/`;

                if (!fs.existsSync(basePath)) {
                    fs.mkdirSync(basePath);
                }
                if (!fs.existsSync(basePath + "/avatar")) {
                    fs.mkdirSync(basePath + "/avatar");
                }
                if (!fs.existsSync(basePath + "/prev")) {
                    fs.mkdirSync(basePath + "/prev");
                }

                const prevDir = basePath + "prev/";

                fs.readdir(prevDir, (err, files) => {
                    if (err) throw err;
                    if (files.length > 0) {
                        console.log("A mappa nem üres!");
                        for (const file of files) {
                            fs.unlink(path.join(prevDir, file), err => {
                                if (err) throw err;
                            });
                        }
                    } else {
                        console.log("Üres a mappa!");
                    }
                });




                file.mv(basePath + "prev/" + unique_name, (err) => {
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

                // await sharp(basePath + "prev/" + unique_name).resize(300, 300).toFile(basePath + "prev/" + "__" + unique_name);


            }
            else {
                return {
                    status: false
                }
            }

        }
    })



module.exports = router;