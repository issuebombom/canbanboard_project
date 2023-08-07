const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  getComments = async (req, res) => {
    try {
      const cardId = req.params.cardId;

      // 댓글 찾기
      const cards = await this.commentService.getComments(cardId);
      return res.send({ data: cards });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };

  createComment = async (req, res) => {
    try {
      const cardId = req.params.cardId;
      const userId = req.user.userId;
      const { content } = req.body;

      await this.commentService.createComment(cardId, userId, content);
      return res.send({ message: '댓글 생성 성공' });
    } catch (err) {
      console.error(err.stack);
      return res.status(err.status).send({ message: `${err.message}` });
    }
  };
}

module.exports = CommentController;
