const { User } = require('../models');
const CustomError = require('../error');
const bcrypt = require('bcrypt')

class UserService {
  // id와 email 기준 조회에 대한 처리
  existsCheck = async (searchKeyword) => {
    const userById = await User.findByPk(searchKeyword);
    const userByEmail = await User.findOne({ where: { email: searchKeyword } });

    if (userById || userByEmail) {
      throw new CustomError(400, '이미 가입한 회원입니다.');
    }
  };

  getUser = async (searchKeyword) => {
    const userById = await User.findByPk(searchKeyword);
    const userByEmail = await User.findOne({ where: { email: searchKeyword } });

    if (!userById && !userByEmail) {
      throw new CustomError(404, '회원 정보가 없습니다.');
    }

    return userById ?? userByEmail;
  };

  isPermitted = (userId, targetUserId) => {
    if (userId !== targetUserId) {
      throw new CustomError(403, '타 유저 프로필 접근 권한 없음');
    }
    return true;
  };

  createUser = async (email, nickname, password, confirm) => {
    /*
    validation 적용 필요
    */
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
}

module.exports = UserService;
