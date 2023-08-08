const { Board, UserBoard } = require('../models');
const CustomError = require('../error');

class UserBoardService {

  createUserBoard = async (userId, boardId) => {
    const createUserBoard = await UserBoard.create({ userId, boardId });
    return createUserBoard;
  };

  getJoinBoard = async (userId) => {
    let boards = await UserBoard.findAll({ where: { userId }, attributes: [], include: [{ model: Board }] });
    if (!boards) {
      throw new CustomError(404, '참여중인 보드가 없습니다.');
    }
    boards = boards.map((board) => board.Board);
    return boards;
  };
}

module.exports = UserBoardService;
