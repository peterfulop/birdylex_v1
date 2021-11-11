const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");


router.get("/", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("index", {
            user: req.user,
            data: JSON.stringify(req.user)
        });
    }
    else {
        res.redirect("/login");
    }
});

router.get("/app", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("app", {
            user: req.user
        });
    }
    else {
        res.redirect("/login");
    }
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});


// router.get("/profile", (req, res) => {
//     if (req.user) {
//         res.render("profile", {
//             user: req.user
//         });
//     }
//     else {
//         res.redirect("/login");
//     }
// });

module.exports = router;