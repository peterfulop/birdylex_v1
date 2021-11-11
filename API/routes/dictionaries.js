const express = require('express');
const router = express.Router();

const DictionariesController = require('../controllers/dictionaries');

router.get('/', DictionariesController.dictionaries_get_all);
router.get('/:dictionaryId', DictionariesController.dictionaries_get_dictionary);
router.get('/search/:name', DictionariesController.dictionaries_get_dictionaryByName);
router.post('/', DictionariesController.dictionaries_post_dictionary);
router.patch('/:dictionaryId', DictionariesController.dictionaries_update_dictionary);
router.delete('/:dictionaryId', DictionariesController.dictionaries_delete_dictionary);

module.exports = router;