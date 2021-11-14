const express = require('express');
const router = express.Router();

const PracticeController = require('../controllers/practice');

router.get('/:userId', PracticeController.practice_get_all);
router.get('/:userId/limit/:limit', PracticeController.practice_get_practice_orderByLimit);
router.post('/', PracticeController.practice_post_practice_result);


module.exports = router;