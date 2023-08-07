const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  findUser = async (req, res) => {
    const userId = req.params.userId; // 프론트에서 보낸 폼데이터를 받는다.

    try {
      // 요청을 보낸 유저
      const me = req.user;

      // 본인 프로필을 조회하는 케이스인지 검증
      const isApproval = this.userService.isPermitted(Number(userId), me.userId);
      if (isApproval) {
        // 유저 찾기
        const user = await this.userService.getUser(Number(userId));
        return res.send({ data: user });
      }
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };
}

module.exports = UserController;
