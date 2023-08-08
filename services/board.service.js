const { User, Board, UserBoard } = require('../models');
const CustomError = require('../error');

class BoardService {
  createBoard = async (name, description, admins, color) => {
    const createdBoard = await Board.create({
      name,
      description,
      admins,
      color,
    });
    return createdBoard;
  };

  findOneBoard = async (boardId) => {
    const detailedBoard = await Board.findOne({ where: { boardId } });

    if (!detailedBoard) {
      throw new CustomError(404, '보드 정보가 없습니다.');
    }
    return detailedBoard;
  };

  modifyBoard = async (boardId, user, name, description, color) => {
    const board = await Board.findOne({ where: { boardId } });
    console.log(board.admins);
    if (!board) {
      throw new CustomError(404, '보드 정보가 없습니다.');
    }
    if (user.userId !== Number(board.admins)) {
      throw new CustomError(403, '보드 수정 권한이 존재하지 않습니다.');
    }
    const updatedBoard = await Board.update({ name, description, color }, { where: { boardId } });
    return updatedBoard;
  };

  deleteBoard = async (boardId, user) => {
    const board = await Board.findOne({ where: { boardId } });
    if (!board) {
      throw new CustomError(404, '보드 정보가 없습니다.');
    }
    if (user.userId !== board.admins) {
      throw new CustomError(403, '보드 삭제 권한이 존재하지 않습니다.');
    }
    // const deystroyedUserBoard = await UserBoard.destroy({ where: { boardId } });
    const deystroyedBoard = await Board.destroy({ where: { boardId } });
    return deystroyedBoard;
  };
}

module.exports = BoardService;
