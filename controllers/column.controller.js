const ColumnService = require("../services/column.service");

class ColumnController {
  columnService = new ColumnService();

  createColumn = async (req, res) => {
    const { boardId } = req.params;
    const { name, order } = req.body;

    try {
      const { status, message, result } = await this.columnService.createColumn(
        boardId,
        order,
        name
      );

      return res.status(status).json({ message: message });
    } catch (error) {
      if (error)
        return res.status(error.status).json({ message: error.message });
      return res
        .status(500)
        .json({ message: "컬럼을 생성하는데 실패하였습니다." });
    }
  };

  getAllColumn = async (req, res) => {
    const { boardId } = req.params;

    try {
      const { status, message, result } = await this.columnService.getAllColumn(
        boardId
      );
      return res.status(status).json({ columns: result });
    } catch (error) {
      if (error)
        return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: "컬럼 조회에 실패하였습니다." });
    }
  };

  updateColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { name, order } = req.body;
    try {
      const { status, message, result } = await this.columnService.updateColumn(
        boardId,
        columnId,
        order,
        name
      );
      return res.status(status).json({ message: message });
    } catch (error) {
      if (error)
        return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: "컬럼 수정에 실패하였습니다." });
    }
  };

  deleteColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    try {
      const { status, message, result } = await this.columnService.deleteColumn(
        boardId,
        columnId
      );
      return res.status(status).json({ message: message });
    } catch (error) {
      if (error)
        return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: "컬럼 삭제에 실패하였습니다." });
    }
  };
}

module.exports = ColumnController;
