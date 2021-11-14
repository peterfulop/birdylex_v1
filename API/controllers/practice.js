const DbServicePractice = require("../services/DbServicePractice");
const db = new DbServicePractice();

exports.practice_get_all = (req, res) => {
    const { userId } = req.params;

    const result = db.getPractices(userId);
    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    count: data.length,
                    info: "practices",
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

exports.practice_get_practice_orderByLimit = (req, res) => {

    const { limit, userId } = req.params;
    const result = db.getPracticeOrderByLimit(userId, limit);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    count: data.length,
                    info: "last practice",
                    data: data
                })
            }
            else {

                res.status(404).json({ message: 'fsd exists ID!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

};


exports.practice_post_practice_result = (req, res) => {

    const { FK_dictionary_id, start_time, end_time, question_count, prompter_count, skipped_count } = req.body;
    const result = db.insertPractice(FK_dictionary_id, start_time, end_time, question_count, prompter_count, skipped_count);

    //////////////////////////
    result
        .then(data => {
            if (data) {
                res.status(201).json({
                    message: "Data has been added!",
                    data: data
                })
            }
            else {
                res.status(404).json({ message: 'Some error!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

    ////////////////////



};