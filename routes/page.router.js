const express = require('express');
const router = express.Router();
const path = require('path');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/login', isNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/index.html'));
});

router.get('/main', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/html/mainPage.html'));
});

router.get('/main/board', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/html/boardPage.html'));
});

router.get('/mypage', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/html/myPage.html'));
});

module.exports = router;
