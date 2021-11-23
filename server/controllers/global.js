const DbServiceGlobal = require("../services/DbServiceGlobal");
var db = new DbServiceGlobal();

exports.menu_get_menuItems = (req, res) => {
    const result = db.getMenuItems();
    result
        .then(data => res.status(200).json({
            count: data.length,
            info: "menu",
            data: data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

};

exports.language_get_languages = (req, res) => {
    const result = db.getLanguages();
    result
        .then(data => res.status(200).json({
            count: data.length,
            info: "languages",
            data: data
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
};
