const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

const BoardController = require('../controllers/board.controller');
const boardController = new BoardController();

// 프로필 조회 (유저 정보 조회)
router.get('/board', isLoggedIn, boardController);
router.post('/board', isLoggedIn, boardController);
router.put('/board', isLoggedIn, boardController);
router.delete('/board', isLoggedIn, boardController);

module.exports = router;
