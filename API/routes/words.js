const express = require('express');
const router = express.Router();

const WordsController = require('../controllers/words');

router.get('/:userId', WordsController.words_get_all);

// router.get('/:wordId', WordsController.words_get_word);
// router.get('/search/:dictionaryId', WordsController.words_get_wordsByDictionaryId);
// router.get('/limit/:limit', WordsController.words_get_words_orderByLimit);
// router.get('/s/:word', WordsController.words_get_wordsBySearch);
router.get('/eq/:dictionaryId/:word_1/:word_2', WordsController.words_get_equalsWord);
// router.get('/eq/:search', WordsController.words_get_equalsWord);
// router.post('/', WordsController.words_post_word);
// router.patch('/:wordId', WordsController.words_update_word);
// router.delete('/:wordId', WordsController.words_delete_word);
// router.delete('/by/:dictionaryId', WordsController.words_delete_wordByDictionaryName);

module.exports = router;