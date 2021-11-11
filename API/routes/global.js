const express = require('express');
const router = express.Router();
const path = require('path');

const GlobalController = require('../controllers/global');


router.get('/menu', GlobalController.menu_get_menuItems);
router.get('/languages', GlobalController.language_get_languages);


module.exports = router;