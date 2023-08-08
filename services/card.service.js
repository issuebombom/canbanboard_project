//const expiryDate = dayjs().add(1, 'year').endOf('day').$d;
const { Card, UserCard, Column } = require('../models');
const CustomError = require('../error');

class CardService {
  // 카드 생성 (UserCard 함께 생성)
  postCard = async (columnId, userId, name, order, description, expiredDate, color) => {
    const card = await Card.create({
      columnId,
      name,
      order,
      description,
      expiredDate,
      color,
    });

    const column = await Column.findByPk(columnId);

    // body 데이터가 정상적으로 전달되지 않은 경우
    if (Object.length(req.body) === 0) {
      throw new CustomError(412, '데이터 형식이 올바르지 않습니다.');
    } else if (!column) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    }

    await UserCard.create({ userId, cardId: card.cardId });

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
  putCard = async (columnId, cardId, name, description, expiredDate, color) => {
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

  // 카드 이동
  moveCard = async () => {
    await Card.update();

    // const card = await Card.findByPk();
    // await card.save();

    if (false) {
      throw new CustomError(400, '에러 내용.');
    }

    return { status: 200, message: '카드를 이동하였습니다.' };
  };
}

module.exports = CardService;
