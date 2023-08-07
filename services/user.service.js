const { User } = require('../models');
const CustomError = require('../error');
const bcrypt = require('bcrypt');

class UserService {
  getUser = async (searchKeyword) => {
    // 존재 유무 체크 후 유저 정보 리턴
    const user = await this.notExistsCheck(searchKeyword);
    return user;
  };

  createUser = async (email, nickname, password, confirm) => {
    /*
    validation 적용 필요
    */

    // 가입 유무 체크
    await this.existsCheck(email);

    if (password !== confirm) {
      throw new CustomError(403, '비밀번호와 비밀번호확인이 일치하지 않음 ');
    }

    // 정상적인 회원가입 절차면 해시화
    const hash = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
      email,
      password: hash,
      nickname,
    });
    return createdUser;
  };

  editUser = async (userId, nickname) => {
    const user = await this.notExistsCheck(userId);
    user.nickname = nickname;
    return await user.save();
    // return await User.update(
    //   {
    //     nickname,
    //   },
    //   { where: { userId } }
    // );
  };

  deleteUser = async (userId, password, realPassword) => {
    const user = await this.notExistsCheck(userId);
    await this.comparePassword(password, realPassword);

    return await user.destroy();
  };

  // ----- helper function

  // id와 email 기준 조회에 대한 처리
  existsCheck = async (searchKeyword) => {
    const userById = await User.findByPk(searchKeyword);
    const userByEmail = await User.findOne({ where: { email: searchKeyword } });

    const user = userById ?? userByEmail;

    if (user) {
      throw new CustomError(400, '이미 가입한 회원입니다.');
    }
    return;
  };

  notExistsCheck = async (searchKeyword) => {
    const userById = await User.findByPk(searchKeyword);
    const userByEmail = await User.findOne({ where: { email: searchKeyword } });

    const user = userById ?? userByEmail;

    if (!user) {
      throw new CustomError(404, '해당 유저가 존재하지 않습니다.');
    }
    return user;
  };

  comparePassword = async (password, targetPassword) => {
    const result = await bcrypt.compare(password, targetPassword);
    if (!result) {
      throw new CustomError(403, '비밀번호가 틀렸습니다.');
    }
    return true;
  };
}

module.exports = UserService;
