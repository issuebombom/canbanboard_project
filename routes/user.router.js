const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// 프로필 조회 (유저 정보 조회)
router.get('/users/:userId', isLoggedIn, userController.findUser);
// 프로필 수정
router.put('/users/:userId', isLoggedIn, userController.editUser);
// 유저 정보 삭제
router.delete('/users/:userId', isLoggedIn, userController.deleteUser);

module.exports = router;
