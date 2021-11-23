const DbServiceDictionaries = require("../services/DbServiceDictionaries");
const db = new DbServiceDictionaries();

// OK! + AUTH
exports.dictionaries_get_all = async (req, res) => {
  const { userId } = req.body;
  const result = db.getDictionaries(userId);
  result
    .then((data) => {
      res.status(200).json({
        info: "dictionaries",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.dictionaries_get_dictionary = (req, res) => {
  const { dictionaryId } = req.params;
  const { userId } = req.body;
  const result = db.getDictionaryById(userId, dictionaryId);
  result
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          data: data,
        });
      } else {
        res.status(404).json({ message: "Not exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.dictionaries_get_dictionaryByName = (req, res) => {
  const { userId } = req.body;
  const { dictionaryName } = req.params;

  const result = db.getDictionaryByName(userId, dictionaryName);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        res.status(404).json({ message: "Not exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// OK! + AUTH
exports.dictionaries_post_dictionary = (req, res) => {
  const { userId, dictionaryName, lang_1, lang_2 } = req.body;
  const result = db.insertDictionary(userId, dictionaryName, lang_1, lang_2);
  result
    .then((data) => {
      if (data) {
        res.status(201).json({
          message: "Dictionary has been created!",
          data: data,
        });
      } else {
        res.status(404).json({ message: "No data added!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.dictionaries_update_dictionary = (req, res) => {
  const { dictionaryId } = req.params;
  const { userId, dictionaryName, lang_1, lang_2 } = req.body;
  const result = db.updateDictionary(
    userId,
    dictionaryId,
    dictionaryName,
    lang_1,
    lang_2
  );
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          messsage: "Update Successfull!",
          data: data,
        });
      } else {
        res.status(404).json({
          messsage: "Some error!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.dictionaries_delete_dictionary = (req, res) => {
  const { dictionaryId } = req.params;
  const { userId } = req.body;
  const result = db.deleteDictionaryById(userId, dictionaryId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Dictionary has been deleted!",
        });
      } else {
        res.status(404).json({ message: "Not exists ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
