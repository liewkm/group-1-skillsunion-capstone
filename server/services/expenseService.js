const { User, Expense, Category } = require("../models");

/* Expense service modules that execute various function with DB as directed 
from controller with appropriate inputs.
Require header decodeToken uid as userId. 

- expenseService.getExpenses retrieve all expenses per userId
- expenseService.addExpense add single expense inputs to expense table and nested category table per userId
- expenseService.editExpense edit single expense on expense table and nested category table per userId
- expenseService.editExpense delete single expense on expense table cascade to nested category table per userId
*/
module.exports = {
  getExpenses: async (uid) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const allExpenses = await Expense.findAll({
      where: { userId: uid },
      include: Category,
    });

    if (allExpenses.length !== 0) {
      result.message = `All Expenses from ${uid} fetched successfully from DB`;
      result.status = 200;
      result.data = allExpenses;
    } else {
      result.message = `Expenses from ${uid} not found!`;
      result.status = 404;
    }
    return result;
  },

  addExpense: async (
    uid,
    expenseDate,
    expenseAmount,
    description,
    categoryType
  ) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const user = await User.findOne({
      where: { id: uid },
    });

    const [category, createdCat] = await Category.findOrCreate({
      where: {
        type: categoryType,
      },
    });

    const [newExpense, created] = await Expense.findOrCreate({
      where: {
        userId: user.id,
        expenseDate: expenseDate,
        expenseAmount: expenseAmount,
        description: description,
      },
      include: [{ model: Category, where: { type: category.type } }],
    });

    if (created) {
      await user.addExpense(newExpense);
      await newExpense.addCategory(category);
      await newExpense.save();
      await category.save();

      result.status = 201;
      result.message = "New Expense created in Expense table";
    } else {
      result.status = 400;
      result.message = "Expense exists in Expense table";
    }
    result.data = newExpense;
    return result;
  },

  editExpense: async (
    uid,
    expenseId,
    expenseDate,
    expenseAmount,
    description,
    categoryType
  ) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const updateExpense = await Expense.findOne({
      where: { id: expenseId },
      include: Category,
    });

    if (updateExpense) {
      updateExpense.update({
        expenseDate: expenseDate,
        expenseAmount: expenseAmount,
        description: description,
      });

      if (updateExpense.Categories[0].type !== categoryType) {
        const [category, createdCat] = await Category.findOrCreate({
          where: { type: categoryType },
        });
        updateExpense.setCategories(category);
        await updateExpense.save();
      }

      result.message = `Expense ${expenseId} updated in DB`;
      result.status = 200;
      result.data = updateExpense;
    } else {
      result.message = `Expense ID ${expenseId} not found!`;
      result.status = 404;
    }
    return result;
  },

  deleteExpense: async (uid, expenseId) => {
    let result = {
      message: null,
      status: null,
    };

    const expense = await Expense.findOne({
      where: { id: expenseId },
      include: Category,
    });

    if (uid && expense) {
      await Expense.destroy({ where: { id: expense.id, userId: uid } });
      result.message = `Expense ${expenseId} from ${uid} is deleted!`;
      result.status = 200;
    } else {
      result.message = `Expense ${expenseId} from ${uid} does not exist in database!`;
      result.status = 404;
    }
    return result;
  },
};
