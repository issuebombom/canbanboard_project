const CardService = require("../services/card.service");

class CardController {
  cardService = new CardService();

  // 카드 생성
  postCard = async (req, res) => {
    const { columnId } = req.params;
    const { userId } = req.user.userId;
    const { name, order, description, expiredDate, color } = req.body;

    try {
      await this.cardService.postCard(
        columnId,
        userId,
        name,
        order,
        description,
        expiredDate,
        color
      );

      res.status(201).send({ message: "카드를 생성하였습니다." });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 조회
  getCard = async (req, res) => {
    const { columnId } = req.params;

    try {
      const cards = await this.cardService.getCard(columnId);

      res.status(201).send({ cards });
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
      await this.cardService.putCard(
        columnId,
        cardId,
        name,
        description,
        expiredDate,
        color
      );

      res.status(200).send({ message: "카드를 수정하였습니다." });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 삭제
  deleteCard = async (req, res) => {
    const { columnId, cardId } = req.params;

    try {
      await this.cardService.deleteCard(columnId, cardId);

      res.status(200).send({ message: "카드를 삭제하였습니다." });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };

  // 카드 이동
  moveCard = async (req, res) => {
    const { columnId, cardId } = req.params;

    try {
      await this.cardService.moveCard();

      res.status(200).send({ message: "카드를 이동하였습니다." });
    } catch (error) {
      console.error(error.stack);
      return res.status(error.status).send({ message: error.message });
    }
  };
}

module.exports = CardController;
