const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  getUser = async (req, res) => {
    try {
      // 요청을 보낸 유저
      const userId = req.user.userId;

      // 유저 찾기
      const user = await this.userService.getUser(userId);
      return res.send({ data: user });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };

  editUser = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { nickname } = req.body;

      await this.userService.editUser(userId, nickname);
      return res.send({ message: '회원 정보 수정 완료' });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const me = req.user;
      const { password } = req.body;

      await this.userService.deleteUser(me.userId, password, me.password);
      return res.send({ message: '탈퇴 완료' });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };
}

module.exports = UserController;
