const { Column, Board } = require('../models');
const CustomError = require('../error');

class ColumnService {
  createColumn = async (boardId, order, name) => {
    const findOneColumn = await Column.findOne({ where: { order } });
    const findOneBoard = await Board.findOne({ where: { boardId } });
    if (!findOneBoard) {
      throw new CustomError(404, '보드가 존재하지 않습니다.');
    } else if (!order || !name) {
      throw new CustomError(400, '데이터 형식이 올바르지 않습니다.');
    }

    await Column.create({ boardId, name, order });
    return { status: 201, message: '컬럼을 생성하였습니다.', result: true };
  };

  getAllColumn = async (boardId) => {
    const findAllColumn = await Column.findAll({ where: { boardId }, order: [['order', 'ASC']] });
    return { status: 200, message: '', result: findAllColumn };
  };

  updateColumn = async (boardId, columnId, name) => {
    const findOneBoard = await Board.findOne({ where: { boardId } });
    if (!findOneBoard) {
      throw new CustomError(404, '보드가 존재하지 않습니다.');
    }
    const findOneColumn = await Column.findOne({ where: { columnId } });
    if (!findOneColumn) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!name) {
      throw new CustomError(400, '데이터 형식이 올바르지 않습니다.');
    }

    await Column.update({ name }, { where: { columnId } });

    return {
      status: 200,
      message: '컬럼 수정에 성공하였습니다.',
      result: true,
    };
  };

  deleteColumn = async (boardId, columnId) => {
    const findOneBoard = await Board.findOne({ where: { boardId } });
    if (!findOneBoard) {
      throw new CustomError(404, '보드가 존재하지 않습니다.');
    }
    const findOneColumn = await Column.findOne({ where: { columnId } });
    if (!findOneColumn) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    }

    await Column.destroy({ where: { columnId } });

    return { status: 200, message: '컬럼을 삭제했습니다.', result: true };
  };

  updateColumnOrder = async (boardId, columnId, order) => {
    const findOneBoard = await Board.findOne({ where: { boardId } });
    if (!findOneBoard) {
      throw new CustomError(404, '보드가 존재하지 않습니다.');
    }
    const findOneColumn = await Column.findOne({ where: { columnId } });
    if (!findOneColumn) {
      throw new CustomError(404, '컬럼이 존재하지 않습니다.');
    } else if (!order) {
      throw new CustomError(400, '데이터 형식이 올바르지 않습니다.');
    }
    await Column.update({ order }, { where: { boardId, columnId } });
    return {
      status: 200,
      message: '컬럼 순서 변경에 성공하였습니다.',
      result: true,
    };
  };
}

module.exports = ColumnService;
