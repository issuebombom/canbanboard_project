require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const memorystore = require("memorystore");
const MemoryStore = memorystore(session);
// const Server = require('http)'
// const socketIo = require('socket.io)'

const passportConfig = require("./passport");

const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
// const boardRouter = require('./routes/board.router');
const cardRouter = require("./routes/card.router");
// const columnRouter = require('./routes/column.router');
// const commentRouter = require('./routes/comment.router');

const app = express();
const port = 3000;
const maxAge = 24 * 60 * 60 * 1000; // 하루
passportConfig(); // 패스포트 설정

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
// body-parser 미들웨어 등록
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: maxAge }),
    secret: process.env.COOKIE_SECRET_KEY,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: maxAge,
    },
  })
);
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

//* 라우터
app.use("/auth", authRouter);
app.use("/api", [userRouter, cardRouter]);

app.listen(port, () => {
  console.log(port, "포트로 접속하였습니다.");
});
