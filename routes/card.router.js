const express = require('express');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const CardController = require('../controllers/card.controller');
const cardController = new CardController();

// 카드 생성
router.post('/columns/:columnId/cards', isLoggedIn, cardController.postCard);

// 카드 조회
router.get('/columns/:columnId/cards', isLoggedIn, cardController.getCard);

// 카드 수정
router.put('/columns/:columnId/cards/:cardId', isLoggedIn, cardController.putCard);

// 카드 삭제
router.delete('/columns/:columnId/cards/:cardId', isLoggedIn, cardController.deleteCard);

module.exports = router;
