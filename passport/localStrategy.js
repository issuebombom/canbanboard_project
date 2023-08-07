const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models')

const LocalStrategy = passportLocal.Strategy;

module.exports = () => {
  //? auth 라우터에서 /login 요청이 오면 local설정대로 이쪽이 실행되게 된다.
  passport.use(
    new LocalStrategy(
      {
        // req.body와 일치시킬 것
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
      },
      async (email, password, done) => {
        // done()의 첫번째 함수는 에러용으로 처리함
        try {
          const foundUser = await User.findOne({ where: { email } });
          if (foundUser) {
            const result = bcrypt.compareSync(password, foundUser.password);
            if (result) {
              done(null, foundUser); // 성공 (done이 수행되면 다시 왔던 곳으로 돌아감)
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
