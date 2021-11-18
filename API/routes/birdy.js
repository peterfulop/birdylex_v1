const express = require("express");
const { isLoggedIn } = require("../controllers/auth");
const router = express.Router();

router.use('/', isLoggedIn, (req, res) => {
    if (req.user) {
        console.log("App render!");
        res.render("app", {
            user: req.user,
        });
    } else {
        console.log(res.message);
        res.render("app", { message: res.message });
    }
});

module.exports = router;