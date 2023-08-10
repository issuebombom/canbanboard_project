const express = require('express');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

const ColumnController = require('../controllers/column.controller');
const columnController = new ColumnController();

/** 컬럼 생성 */
router.post('/boards/:boardId/columns', isLoggedIn, columnController.createColumn);
/** 컬럼 목록 조회 */
router.get('/boards/:boardId/columns', isLoggedIn, columnController.getAllColumn);
/** 컬럼 수정 */
router.put('/boards/:boardId/columns/:columnId', isLoggedIn, columnController.updateColumn);
/** 컬럼 삭제 */
router.delete('/boards/:boardId/columns/:columnId', isLoggedIn, columnController.deleteColumn);
/** 컬럼 순서 수정 */
router.put('/boards/:boardId/columns/:columnId/order', isLoggedIn, columnController.updateColumnOrder);

module.exports = router;
