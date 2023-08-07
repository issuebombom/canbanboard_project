const BoardService = require('../services/board.service');

class BoardController {
  boardService = new BoardService();
}

module.exports = BoardController;
