const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.js');

router.get('/', UserController.users_get_all);
router.get('/:userId', UserController.users_get_userById);
router.get('/search/:email', UserController.users_get_userByEmail);
router.get('/equal/:search', UserController.users_get_name_email);
router.get('/login/:check', UserController.user_login);
router.post('/', UserController.users_post_user);
router.patch('/:userId');
router.delete('/:userId');

module.exports = router;