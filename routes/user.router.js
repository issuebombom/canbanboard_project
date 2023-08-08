const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// 프로필 조회 (유저 정보 조회)
router.get('/profile', isLoggedIn, userController.getUser);
// 프로필 수정
router.put('/profile', isLoggedIn, userController.editUser);
// 비밀번호 수정
router.put('/profile/password', isLoggedIn, userController.editUserPassword);
// 유저 정보 삭제
router.delete('/profile', isLoggedIn, userController.deleteUser);

module.exports = router;
