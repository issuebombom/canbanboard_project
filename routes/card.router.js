const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

const CardController = require('../controllers/card.controller');
const cardController = new CardController();

// 카드 생성
router.post('column/:columnId/card', isLoggedIn, cardController.postCard);

// 카드 조회
router.get('column/:columnId/card', isLoggedIn, cardController.getCard);

// 카드 수정
router.put('column/:columnId/card/:cardId', isLoggedIn, cardController.putCard);

// 카드 삭제
router.delete('column/:columnId/card/:cardId', isLoggedIn, cardController.deleteCard);

// 카드 이동
router.put('column/:columnId/card/:cardId', isLoggedIn, cardController.moveCard);

module.exports = router;
