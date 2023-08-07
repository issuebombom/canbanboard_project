const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// 프로필 조회 (유저 정보 조회)
router.get('/users/:userId', isLoggedIn, userController.findUser);

module.exports = router;
