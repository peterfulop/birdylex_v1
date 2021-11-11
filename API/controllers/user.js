const DbServiceUsers = require("../services/DbServiceUsers");
const db = new DbServiceUsers();

exports.users_get_all = (req, res) => {
    const result = db.getUsers();
    console.log("getAll");
    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    count: data.length,
                    info: "users",
                    data: data
                })
            } else {
                res.status(404).json({ message: 'No items found!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};

exports.users_get_userById = (req, res) => {

    const { userId } = req.params;
    const result = db.getUserById(userId);
    console.log("byId");

    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    data: data
                })
            }
            else {
                res.status(404).json({ message: 'Not exists ID!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};

exports.users_get_userByEmail = (req, res) => {

    const { email } = req.query;
    const result = db.getUserByEmail(email);

    console.log("byEmail", req.query);

    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    data: true
                })
            }
            else {
                res.status(200).json({
                    data: false
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};

exports.users_get_name_email = (req, res) => {

    const { username, email } = req.query;
    console.log("byNameEmail", req.query);

    const result = db.getUserByNameAndEmail(username, email);
    result
        .then(data => {

            if (data[0]) {
                res.status(200).json({
                    data: data
                })
            }
            else {
                res.status(404).json({
                    message: 'Not exists User!',
                    data: data
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};
exports.user_login = (req, res) => {

    const { email, password } = req.body;

    //if (!email || !password) return res.status(400);

    const result = db.getUserByEmailAndPassword(email, password);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    data: data
                })
                console.log(data);
            }
            else {
                res.status(404).json({
                    message: 'Not valid email or password!',
                    data: data
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};



exports.users_post_user = (req, res) => {
    const { username, email, password } = req.body;
    const result = db.insertUser(username, email, password);
    result
        .then(data => {
            if (data) {
                res.status(201).json({
                    messsage: 'Data added!',
                    data: data
                })
            }
            else {
                res.status(404).json({
                    messsage: 'Some error!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};