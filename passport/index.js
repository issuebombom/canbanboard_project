const passport = require('passport');
const local = require('./localStrategy');
const { User } = require('../models');

module.exports = () => {
  // req.login() 함수 실행 시 serializeUser가 실행됨
  passport.serializeUser((user, done) => {
    // req.session객체에 어떤 데이터를 저장할 지 선택한다.
    done(null, user.userId); // deserializeUser로 이동
  });

  // serializeUser()가 done하거나 passport.session()을 실행 시
  passport.deserializeUser((userId, done) => {
    User.findOne({ where: { userId } })
      .then((user) => done(null, user)) // req.login으로 돌아가 유저 정보를 다음 미들웨어에 전달
      .catch((err) => done(err)); // 에러가 있으면 다시 req.login으로 이동(콜백)
  });
  local();
};
