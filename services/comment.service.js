const { Comment } = require('../models');
const CustomError = require('../error');

class CommentService {
  getComments = async (cardId) => {
    const cards = await Comment.findAll({ where: { cardId } });
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
