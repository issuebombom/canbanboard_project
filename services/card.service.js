const { User, Card, UserCard, Column } = require('../models');
const CustomError = require('../error');
const UserCardService = require('../services/usercard.service');
const dayjs = require('dayjs');

class CardService {
  userCardService = new UserCardService();

  // 카드 생성 (UserCard 함께 생성)
  postCard = async (columnId, userId, name, order, description, expiredDate, color) => {
    const findOneCard = await Card.findOne({ where: { order } });
    // const findOneColumn = await Column.findByPk(columnId);

    // if (findOneCard) {
    //   throw new CustomError(409, '이미 존재하는 순서입니다.');
    // body 데이터가 정상적으로 전달되지 않은 경우}
    if (!name || !order) {
      throw new CustomError(412, '데이터 형식이 올바르지 않습니다.');
    }
    // } else if (!findOneColumn) {
    //   throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    // }
    const card = await Card.create({
      columnId,
      name,
      order,
      description,
      expiredDate: new Date(expiredDate), // '2023-03-08'
      color,
    });

    await UserCard.create({ userId, cardId: card.cardId });

    return { status: 201, message: '카드를 생성하였습니다.' };
  };

  // 카드 조회
  getCard = async (columnId) => {
    const column = await Column.findByPk(columnId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    }

    const cards = await Card.findAll({ where: { columnId } });
    return { status: 201, message: '카드 조회에 성공하였습니다.', cards };
  };

  // 카드 수정
  putCard = async (userId, columnId, cardId, name, order, description, expiredDate, color) => {
    const cards = await this.userCardService.getJoinCard(userId);
    const column = await Column.findByPk(columnId);
    let card = await Card.findByPk(cardId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!card) {
      throw new CustomError(404, '카드가 존재하지 않습니다.');
    } else if (card.cardId !== cards[0].cardId) {
      throw new CustomError(403, '카드 수정 권한이 존재하지 않습니다.');
    }

    // 수정할 데이터가 존재 하면 수정 후 저장
    if (name) card.name = name;
    if (order) card.order = order;
    if (description) card.description = description;
    if (expiredDate) card.expiredDate = new Date(expiredDate);
    if (color) card.color = color;

    card = await card.save();

    return { status: 201, message: '카드를 수정하였습니다.', card };
  };

  // 카드 삭제
  deleteCard = async (userId, columnId, cardId) => {
    const cards = await this.userCardService.getJoinCard(userId);
    const column = await Column.findByPk(columnId);
    let card = await Card.findByPk(cardId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!card) {
      throw new CustomError(404, '카드가 존재하지 않습니다.');
    } else if (card.cardId !== cards[0].cardId) {
      throw new CustomError(403, '카드 수정 권한이 존재하지 않습니다.');
    }

    await Card.destroy({ where: { cardId } });

    return { status: 200, message: '카드를 삭제하였습니다.' };
  };

  inviteUser = async (cardId, email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError(404, '유저가 존재하지 않습니다.');
    }

    // userCard 생성
    await this.userCardService.createUserCard(user.userId, Number(cardId));
    return { status: 200, message: '유저를 카드에 초대하였습니다.' };
  };
}

module.exports = CardService;
