const express = require('express');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const BoardController = require('../controllers/board.controller');
const boardController = new BoardController();

// 보드 목록 조회
router.get('/boards', isLoggedIn, boardController.getJoinBoard);

// 보드 상세 조회
router.get('/boards/:boardId', isLoggedIn, boardController.findOneBoard);

// 보드 생성
router.post('/boards', isLoggedIn, boardController.createBoard);

// 보드 수정
router.put('/boards/:boardId', isLoggedIn, boardController.modifyBoard);

// 보드 삭제
router.delete('/boards/:boardId', isLoggedIn, boardController.deleteBoard);

// 보드 초대
router.post('/boards/:boardId/invite', isLoggedIn, boardController.inviteBoard);

module.exports = router;
