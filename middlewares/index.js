//* 사용자 미들웨어를 직접 구현
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login')
    // res.status(403).send({ message: '로그인 필요' });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/main')
    // res.status(403).send({ message: '이미 로그인 되어 있음' });
  }
};
