const DbServicePractice = require("../services/DbServicePractice");
const db = new DbServicePractice();

// OK! + AUTH
exports.practice_get_all = (req, res) => {
  const { userId } = req.body;

  const result = db.getPractices(userId);
  result
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          count: data.length,
          info: "practices",
          data: data,
        });
      } else {
        res.status(200).json({
          count: data.length,
          info: "no results",
          data: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.practice_get_practice_orderByLimit = (req, res) => {
  const { limit } = req.params;
  const { userId } = req.body;

  const result = db.getPracticeOrderByLimit(userId, limit);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "last practice",
          data: data,
        });
      } else {
        res.status(404).json({ message: "fsd exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.practice_post_practice_result = (req, res) => {
  const {
    userId,
    dictionary_name,
    start_time,
    end_time,
    question_count,
    prompter_count,
    skipped_count,
  } = req.body;

  const result = db.insertPractice(
    userId,
    dictionary_name,
    start_time,
    end_time,
    question_count,
    prompter_count,
    skipped_count
  );

  result
    .then((data) => {
      if (data) {
        res.status(201).json({
          message: "Data has been added!",
          data: data,
        });
      } else {
        res.status(404).json({ message: "Some error!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
