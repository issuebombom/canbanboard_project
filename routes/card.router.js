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

// 카드에 유저를 초대합니다. (작업자 추가)
router.post('/columns/:columnId/cards/:cardId', isLoggedIn, cardController.inviteUser);

// 카드 상세 조회
router.get('/columns/:columnId/cards/:cardId', isLoggedIn, cardController.getDetailCard);

//카드 참여하는 멤버 조회
router.get('/cards/:cardId/users', isLoggedIn, cardController.getJoinUser);

// 카드 순서 수정
router.put('/columns/:columnId/cards/:cardId/order', isLoggedIn, cardController.updateCardOrder);

module.exports = router;
