const { Board, UserBoard } = require('../models');
const CustomError = require('../error');

class UserBoardService {
  createUserBoard = async ({ userBoardId, userId, boardId }) => {
    console.log(userId);
    console.log(boardId);
    const createUserBoard = await UserBoard.create({ userBoardId, userId, boardId });
    return createUserBoard;
  };

  getJoinBoard = async (userId) => {
    const userBoard = await UserBoard.findAll({ where: { userId }, attributes: [], include: [{ model: Board }] });
    if (!userBoard) {
      throw new CustomError(404, '참여중인 보드가 없습니다.');
    }
    return userBoard;
  };
  // deystroyedUserBoard = async (boardId, user) => {
  //   const userBoard = await UserBoard.findAll({ where: { boardId } });
  //   if (!userBoard) {
  //     throw new CustomError(404, '참여중인 보드가 없습니다.');
  //   }
  //   const deystroyedUserBoard = await UserBoard.destroy({ where: { boardId } });
  //   return deystroyedUserBoard;
  // };
}

module.exports = UserBoardService;
