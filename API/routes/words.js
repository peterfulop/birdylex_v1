const express = require("express");
const router = express.Router();

const WordsController = require("../controllers/words");

router.get("/:userId", WordsController.words_get_all);

router.get("/bywordid/:userId/:wordId", WordsController.words_get_word);

router.get(
  "bydictionaryid/:userId/:dictionaryId",
  WordsController.words_get_wordsByDictionaryId
);

router.get("/byword/:userId/:word", WordsController.words_get_wordsBySearch);

router.get(
  "/limit/:userId/:limit",
  WordsController.words_get_words_orderByLimit
);

router.get(
  "equal/:userId/:dictionaryId/:word_1/:word_2",
  WordsController.words_get_equalsWord
);

router.post("/post", WordsController.words_post_word);

router.patch("/patch", WordsController.words_update_word);

router.delete("/bywordid/:userId/:wordId", WordsController.words_delete_word);

router.delete(
  "/bydictionaryid/:userId/:dictionaryId",
  WordsController.words_delete_wordByDictionaryId
);

module.exports = router;
