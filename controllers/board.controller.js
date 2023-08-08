const BoardService = require('../services/board.service');
const UserBoardService = require('../services/userboard.service');

class BoardController {
  boardService = new BoardService();
  userBoardService = new UserBoardService();

  createBoard = async (req, res) => {
    const { name, description, color } = req.body;
    const user = req.user;

    try {
      const board = await this.boardService.createBoard(name, description, user.userId, color);
      await this.userBoardService.createUserBoard(user.userId, board.boardId);
      return res.send({ message: '보드 생성 완료' });
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
      await this.boardService.deleteBoard(boardId, user);
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
