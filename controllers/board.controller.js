const BoardService = require('../services/board.service');
const UserBoardService = require('../services/userboard.service');
const { uuid } = require('uuid');

class BoardController {
  boardService = new BoardService();
  userBoardService = new UserBoardService();

  createBoard = async (req, res) => {
    const { name, description, color } = req.body;
    const user = req.user;
    const totalColumnsNum = [{ column: 'column1' }, { column: 'column2' }, { column: 'column2' }];

    try {
      const board = await this.boardService.createBoard({
        name,
        description,
        admins: user.userId,
        color,
        totalColumnsNum: totalColumnsNum,
      });
      const userBoard = await this.userBoardService.createUserBoard({
        userBoardId: uuid,
        userId: user.userId,
        boardId: board.boardId,
      });
      return res.send({ data: board, userBoard });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status || 500).send({ message: `${err.message}` });
    }
  };

  getJoinBoard = async (req, res) => {
    const user = req.user;
    try {
      const joinBoard = await this.userBoardService.getJoinBoard(user.userId);
      return res.send({ data: joinBoard });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status || 500).send({ message: `${err.message}` });
    }
  };

  findOneBoard = async (req, res) => {
    const { boardId } = req.params;
    try {
      const detailBoard = await this.boardService.findOneBoard(boardId);
      return res.send({ data: detailBoard });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status || 500).send({ message: `${err.message}` });
    }
  };

  modifyBoard = async (req, res) => {
    const { boardId } = req.params;
    const user = req.user;
    console.log(user.userId);
    const { name, description, color } = req.body;
    try {
      const mdfBoard = await this.boardService.modifyBoard(boardId, user, name, description, color);
      return res.send({ message: '수정되었습니다.' });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status || 500).send({ message: `${err.message}` });
    }
  };

  deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    const user = req.user;
    try {
      // const dstUserBoard = await this.UserBoardService.destroyUserBoard(boardId, user);
      const dstBoard = await this.boardService.deleteBoard(boardId, user);
      return res.send({ message: '삭제되었습니다.' });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status || 500).send({ message: `${err.message}` });
    }
  };

  // inviteBoard = async (req, res) => {
  //   const { email } = req.body;
  //   const { boardId } = req.params;
  //   try {
  //     const ivtBoard = await this.boardService.inviteBoard(email, boardId);
  //     return res.send({ message: '초대하였습니다.' });
  //   } catch (err) {
  //     console.error(err.stack);
  //     return res.status(err.status || 500).send({ message: `${err.message}` });
  //   }
  // };
}

module.exports = BoardController;
