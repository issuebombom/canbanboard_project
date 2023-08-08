const express = require('express');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

// 코멘트 생성
router.post('/cards/:cardId/comment', isLoggedIn, commentController.createComment);
// 코멘트 조회 (유저 정보 조회)
router.get('/cards/:cardId/comment', isLoggedIn, commentController.getComments);

module.exports = router;
