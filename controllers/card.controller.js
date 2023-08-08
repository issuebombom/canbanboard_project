const CardService = require('../services/card.service');

class CardController {
  cardService = new CardService();

  // 카드 생성
  postCard = async (req, res) => {
    const { columnId } = req.params;
    const { userId } = req.user.userId;
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
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 조회
  getCard = async (req, res) => {
    const { columnId } = req.params;

    try {
      const { status, cards } = await this.cardService.getCard(columnId);

      res.status(status).send({ cards });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 수정
  putCard = async (req, res) => {
    const { columnId, cardId } = req.params;
    const { name, description, expiredDate, color } = req.body;

    try {
      const { status, message } = await this.cardService.putCard(
        columnId,
        cardId,
        name,
        description,
        expiredDate,
        color
      );

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 삭제
  deleteCard = async (req, res) => {
    const { columnId, cardId } = req.params;

    try {
      const { status, message } = await this.cardService.deleteCard(columnId, cardId);

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 이동
  moveCard = async (req, res) => {
    const { columnId, cardId } = req.params;

    try {
      const { status, message } = await this.cardService.moveCard();

      res.status(status).send({ message });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };
}

module.exports = CardController;
