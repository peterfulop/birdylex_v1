const express = require('express');
const router = express.Router();

const PracticeController = require('../controllers/practice');

router.get('/', PracticeController.practice_get_all);
router.get('/limit/:limit', PracticeController.practice_get_practice_orderByLimit);
router.post('/', PracticeController.practice_post_practice_result);


module.exports = router;