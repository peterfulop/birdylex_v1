const DbServiceWords = require("../services/DbServiceWords");
const db = new DbServiceWords();


exports.words_get_all = (req, res) => {
    const result = db.getWords();
    result
        .then(data => {
            if (data[0]) {
                res.status(200).json({
                    count: data.length,
                    info: "words",
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

exports.words_get_word = (req, res) => {
    const { wordId } = req.params;
    const result = db.getWordById(wordId);
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

exports.words_get_wordsBySearch = (req, res) => {

    const { word } = req.params;
    const result = db.getWordsBySearch(word);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    count: data.length,
                    info: "search resoult",
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

exports.words_get_equalsWord = (req, res) => {

    const dictionaryId = req.query.dictionaryId;
    const word_1 = req.query.word_1;
    const word_2 = req.query.word_2;

    const result = db.getEqualsWord(dictionaryId, word_1, word_2);
    result
        .then(data => {
            console.log(data);
            if (data) {
                res.status(200).json({
                    count: data.length,
                    info: "search results",
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


exports.words_get_words_orderByLimit = (req, res) => {

    const { limit } = req.params;
    const result = db.getWordsOrderByLimit(limit);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    count: data.length,
                    info: "last added",
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

exports.words_get_wordsByDictionaryId = (req, res) => {

    const { dictionaryId } = req.params;
    const result = db.getWordsByDictionaryId(dictionaryId);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    count: data.length,
                    info: "words by dictionary id",
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

exports.words_post_word = (req, res) => {
    const { dictionaryId, word_1, word_2, lang_1, lang_2 } = req.body;
    const result = db.insertWord(dictionaryId, word_1, word_2, lang_1, lang_2);
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

};

exports.words_update_word = (req, res) => {
    const { wordId, word_1, word_2, lang_1, lang_2 } = req.body;
    const result = db.updateWord(wordId, word_1, word_2, lang_1, lang_2);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    messsage: 'Update Successfull!',
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

exports.words_delete_wordByDictionaryName = (req, res) => {
    const { dictionaryId } = req.params;
    const result = db.deleteWordsByDictionaryId(dictionaryId);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Words has been deleted!'
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

exports.words_delete_word = (req, res) => {
    const { wordId } = req.params;
    const result = db.deleteWordById(wordId);
    result
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Word has been deleted!'
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
