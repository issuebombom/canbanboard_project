const { Card, User, UserCard } = require('../models');
const CustomError = require('../error');

class UserCardService {
  createUserCard = async (userId, cardId) => {
    const createUserCard = await UserCard.create({ userId, cardId });
    return createUserCard;
  };

  getJoinCard = async (userId) => {
    let cards = await UserCard.findAll({ where: { userId }, attributes: [], include: [{ model: Card }] });
    if (!cards) {
      throw new CustomError(404, '참여한 카드가 없습니다.');
    }
    cards = cards.map((card) => card.Card);
    return cards;
  };

  getJoinUser = async (cardId) => {
    let users = await UserCard.findAll({ where: { cardId }, include: [{ model: User }] });
    if (!users) {
      throw new CustomError(404, '참여자가 없습니다.');
    }
    users = users.map((user) => user.User);
    return users;
  };
}

module.exports = UserCardService;
