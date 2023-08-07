const express = require('express');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const ColumnController = require('../controllers/column.controller');
const columnController = new ColumnController();

/** 컬럼 생성 */
router.post('/board/:boardId/column', isLoggedIn, columnController.createColumn);
/** 컬럼 목록 조회 */
router.get('/board/:boardId/column', isLoggedIn, columnController.getAllColumn);
/** 컬럼 수정 */
router.put('/board/:boardId/column/:columnId', isLoggedIn, columnController.updateColumn);
/** 컬럼 삭제 */
router.delete('/board/:boardId/column/:columnId', isLoggedIn, columnController.deleteColumn);

module.exports = router;
