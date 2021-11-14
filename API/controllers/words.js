const DbServiceWords = require("../services/DbServiceWords");
const db = new DbServiceWords();

// OK! + AUTH
exports.words_get_all = (req, res) => {
  const { userId } = req.body;
  console.log("words_get_all for:", userId);
  const result = db.getWords(userId);
  console.log(result);
  result
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          count: data.length,
          info: "words_get_all",
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
exports.words_get_word = (req, res) => {
  const { wordId } = req.params;
  const { userId } = req.body;
  const result = db.getWordById(userId, wordId);
  result
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          count: data.length,
          info: "words_get_word",
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
exports.words_get_wordsBySearch = (req, res) => {
  const { userId } = req.body;
  const { word } = req.params;
  const result = db.getWordsBySearch(userId, word);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "words_get_wordsBySearch",
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
exports.words_get_wordsByDictionaryId = (req, res) => {
  const { dictionaryId } = req.params;
  const { userId } = req.body;
  console.log(dictionaryId, userId);
  const result = db.getWordsByDictionaryId(userId, dictionaryId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "words by dictionary id",
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
exports.words_get_words_orderByLimit = (req, res) => {
  const { limit } = req.params;
  const { userId } = req.body;
  const result = db.getWordsOrderByLimit(userId, limit);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "words_get_words_orderByLimit",
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
exports.words_get_equalsWord = (req, res) => {
  const { dictionaryId, word_1, word_2 } = req.params;
  const { userId } = req.body;
  const result = db.getEqualsWord(userId, dictionaryId, word_1, word_2);
  result
    .then((data) => {
      console.log(data);
      if (data) {
        res.status(200).json({
          count: data.length,
          info: "getEqualsWord",
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
exports.words_post_word = (req, res) => {
  const { userId, dictionaryId, word_1, word_2, lang_1, lang_2 } = req.body;
  const result = db.insertWord(
    userId,
    dictionaryId,
    word_1,
    word_2,
    lang_1,
    lang_2
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

// OK! + AUTH
exports.words_update_word = (req, res) => {
  const { wordId } = req.params;
  const { userId, word_1, word_2, lang_1, lang_2 } = req.body;
  const result = db.updateWord(userId, wordId, word_1, word_2, lang_1, lang_2);
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

// OK! + AUTH
exports.words_delete_word = (req, res) => {
  const { wordId } = req.params;
  const { userId } = req.body;
  const result = db.deleteWordById(userId, wordId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Word has been deleted!",
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
exports.words_delete_wordByDictionaryId = (req, res) => {
  const { dictionaryId } = req.params;
  const { userId } = req.body;
  const result = db.deleteWordsByDictionaryId(userId, dictionaryId);
  result
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Words has been deleted!",
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
