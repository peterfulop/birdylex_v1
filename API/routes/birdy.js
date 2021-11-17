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
        console.log("main ERROR");
        console.log("response message:", res.message);
        res.render("app", { message: res.message });
    }
});

module.exports = router;