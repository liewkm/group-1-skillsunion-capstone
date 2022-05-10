const expenseService = require("../services/expenseService");

/*
Control expense input logic & user id, expenseController --> expenseService --> model
expenseService: getExpenses / addExpense / editExpense / deleteExpense
*/

class ExpenseController {
  async getExpenses(req, res) {
    const uid = req.uid;

    try {
      const result = await expenseService.getExpenses(uid);
      return res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res.status(500).json({ sucess: false, error: error });
      }
    }
  }

  async addExpense(req, res) {
    const uid = req.uid;
    const { expenseDate, expenseAmount, description, categoryType } = req.body;

    try {
      if (uid) {
        const result = await expenseService.addExpense(
          uid,
          expenseDate,
          expenseAmount,
          description,
          categoryType
        );
        return res
          .status(result.status)
          .json({ message: result.message, data: result.data });
      } else {
        return res.status(400).json({ message: `uid invalid` });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res.status(500).json({ sucess: false, error: error });
      }
    }
  }

  async editExpense(req, res) {
    const uid = req.uid;
    const expenseId = req.params.expenseId;
    const { expenseDate, expenseAmount, description, categoryType } = req.body;

    try {
      if (uid && expenseId) {
        const result = await expenseService.editExpense(
          uid,
          expenseId,
          expenseDate,
          expenseAmount,
          description,
          categoryType
        );
        return res
          .status(result.status)
          .json({ message: result.message, data: result.data });
      } else {
        return res.status(400).json({ message: `uid or expenseId invalid` });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res.status(500).json({ sucess: false, error: error });
      }
    }
  }

  async deleteExpense(req, res) {
    const uid = req.uid;
    const expenseId = req.params.expenseId;

    try {
      if (uid && expenseId) {
        const result = await expenseService.deleteExpense(uid, expenseId);
        return res.status(result.status).json({ message: result.message });
      } else {
        return res.status(404).json({ message: `uid or expenseId invalid` });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res
          .status(500)
          .json({ sucess: false, error: "Internal server error!" });
      }
    }
  }
}

module.exports = ExpenseController;
