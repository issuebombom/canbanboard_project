const { Board, UserBoard, User } = require('../models');
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

  inviteBoard = async (email, boardId) => {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      throw new CustomError(404, '초대하신 유저가 존재하지않습니다.');
    }

    const invitedBoard = await UserBoard.create({ userId: user.userId, boardId });
    return invitedBoard;
  };

  getJoinUser = async (boardId) => {
    let users = await UserBoard.findAll({ where: { boardId }, attributes: [], include: [{ model: User }] });
    if (!users) {
      throw new CustomError(404, '참여자가 없습니다.');
    }
    users = users.map((user) => user.User);
    return users;
  };
}

module.exports = UserBoardService;
