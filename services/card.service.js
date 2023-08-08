const { Card, UserCard, Column } = require('../models');
const CustomError = require('../error');
const dayjs = require('dayjs');

class CardService {
  // 카드 생성 (UserCard 함께 생성)
  postCard = async (columnId, userId, name, order, description, expiredDate, color) => {
    const findOneCard = await Card.findOne({ where: { order } });
    // const findOneColumn = await Column.findByPk(columnId);

    if (findOneCard) {
      throw new CustomError(409, '이미 존재하는 순서입니다.');
      // body 데이터가 정상적으로 전달되지 않은 경우
    } else if (!name || !order) {
      throw new CustomError(412, '데이터 형식이 올바르지 않습니다.');
    }
    // } else if (!findOneColumn) {
    //   throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    // }

    expiredDate = dayjs().add(1, 'year').endOf('day').$d;
    console.log(expiredDate);

    const card = await Card.create({
      columnId,
      name,
      order,
      description,
      expiredDate,
      color,
    });

    console.log(userId, card.cardId);

    await UserCard.create({ userId: 6, cardId: 1 });

    return { status: 201, message: '카드를 생성하였습니다.' };
  };

  // 카드 조회
  getCard = async (columnId) => {
    const column = await Column.findByPk(columnId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    }

    return await Card.findAll({ where: { columnId } });
  };

  // 카드 수정
  putCard = async (columnId, cardId, name, order, description, expiredDate, color) => {
    const column = await Column.findByPk(columnId);
    const card = await Card.findByPk(cardId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!card) {
      throw new CustomError(404, '카드가 존재하지 않습니다.');
    } else if (card.cardId !== cardId) {
      throw new CustomError(403, '카드 수정 권한이 존재하지 않습니다.');
    }

    // 수정할 데이터가 존재 하면 수정 후 저장
    if (name) card.name = name;
    if (order) card.order = order;
    if (description) card.description = description;
    if (expiredDate) card.expiredDate = expiredDate;
    if (color) card.color = color;

    const cards = await card.save();

    return { status: 201, message: '카드를 수정하였습니다.', cards };
  };

  // 카드 삭제
  deleteCard = async (columnId, cardId) => {
    const column = await Column.findByPk(columnId);
    const card = await Card.findByPk(cardId);

    if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!card) {
      throw new CustomError(404, '카드가 존재하지 않습니다.');
    } else if (card.cardId !== cardId) {
      throw new CustomError(403, '카드 수정 권한이 존재하지 않습니다.');
    }

    await Card.destroy({ where: { cardId } });

    return { status: 200, message: '카드를 삭제하였습니다.' };
  };
}

module.exports = CardService;
