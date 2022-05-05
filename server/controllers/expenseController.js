// control logic and Return results from service.model

// import service
const expenseService = require("../services/expenseService");

// establish the RecipeController first, then recipeService
class ExpenseController {
  async getExpenses(req, res) {
    const uid = req.uid;

    try {
      // use the service layer
      const result = await expenseService.getExpenses(uid);

      console.log("controller getExpenses Results: ", result);

      return res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res
          .status(500)
          .json({ sucess: false, error: "Internal server error!" });
      }
    }
  }

  async addExpense(req, res) {
    const uid = req.uid;
    const { expenseDate, expenseAmount, description, categoryType } = req.body;

    try {
      if (uid) {
        // use the service layer
        const result = await expenseService.addExpense(
          uid,
          expenseDate,
          expenseAmount,
          description,
          categoryType
        );

        console.log("controller addExpense Result: ", result);

        return res
          .status(result.status)
          .json({ message: result.message, data: result.data });
      } else {
        return res.status(400).json({ message: `uid invalid` });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res
          .status(500)
          .json({ sucess: false, error: "Internal server error!" });
      }
    }
  }

  async editExpense(req, res) {
    const uid = req.uid;
    const expenseId = req.params.expenseId;
    const { expenseDate, expenseAmount, description, categoryType } = req.body;

    try {
      if (uid && expenseId) {
        // use the service layer
        const result = await expenseService.editExpense(
          uid,
          expenseId,
          expenseDate,
          expenseAmount,
          description,
          categoryType
        );

        console.log("controller editExpense Result: ", result);

        return res
          .status(result.status)
          .json({ message: result.message, data: result.data });
      } else {
        return res.status(400).json({ message: `uid or expenseId invalid` });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res
          .status(500)
          .json({ sucess: false, error: "Internal server error!" });
      }
    }
  }

  async deleteExpense(req, res) {
    const uid = req.uid;
    const expenseId = req.params.expenseId;

    try {
      if (uid && expenseId) {
        // use the service layer
        const result = await expenseService.deleteExpense(uid, expenseId);

        console.log("controller deleteExpense Result: ", result);

        return res.status(result.status).json({ message: result.message });
      } else {
        return res.status(404).json({ message: `uid or expenseId invalid` });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
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
