const CardService = require('../services/card.service');

class CardController {
  cardService = new CardService();

  // 카드 생성
  postCard = async (req, res) => {
    const { columnId } = req.params;
    const userId = req.user.userId;
    const { name, order, description, expiredDate, color } = req.body;

    try {
      const { status, message } = await this.cardService.postCard(
        columnId,
        userId,
        name,
        order,
        description,
        expiredDate,
        color
      );

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status || 500).send({ message: error.message });
    }
  };

  // 카드 조회
  getCard = async (req, res) => {
    const { columnId } = req.params;

    try {
      const { status, message, cards } = await this.cardService.getCard(columnId);

      res.status(status).send({ message, data: cards });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status || 500).send({ message: error.message });
    }
  };

  // 카드 수정
  putCard = async (req, res) => {
    const { columnId, cardId } = req.params;
    const userId = req.user.userId
    const { name, order, description, expiredDate, color } = req.body;

    try {
      const { status, message } = await this.cardService.putCard(
        userId,
        columnId,
        cardId,
        name,
        order,
        description,
        expiredDate,
        color
      );

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status || 500).send({ message: error.message });
    }
  };

  // 카드 삭제
  deleteCard = async (req, res) => {
    const { columnId, cardId } = req.params;
    const userId = req.user.userId
    try {
      const { status, message } = await this.cardService.deleteCard(userId, columnId, cardId);

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status || 500).send({ message: error.message });
    }
  };
}

module.exports = CardController;
