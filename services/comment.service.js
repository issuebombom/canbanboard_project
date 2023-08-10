const { Comment, User } = require('../models');
const CustomError = require('../error');
class CommentService {
  getComments = async (cardId) => {
    const cards = await Comment.findAll({
      where: { cardId },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
    return cards;
  };
  createComment = async (cardId, userId, content) => {
    /*
    validation 적용 필요
    */
    const createdComment = await Comment.create({
      cardId,
      userId,
      content,
    });
    return createdComment;
  };
}

module.exports = CommentService;
