// execute to DB model
const { User, Expense, ExpenseCategory, Category } = require("../models");

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

    console.log("findAll, allExpenses", JSON.stringify(allExpenses));

    if (allExpenses.length !== 0) {
      result.message = `All Expenses from ${uid} fetched successfully from DB`;
      result.status = 200;
      result.data = allExpenses;

      // console.log(`All Expenses from ${uid} fetched: `, JSON.stringify(result.data));
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

    // console.log("newExpense, created: \n", created, newExpense);

    if (created) {
      // association
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

    // console.log("Present updateExpense: \n ", updateExpense);
    const [category, createdCat] = await Category.findOrCreate({
      where: {
        type: categoryType,
      },
    });

    const updateExpense = await Expense.findOne({
      where: { id: expenseId },
      include: Category,
    });

    if (updateExpense && category) {
      updateExpense.setCategories(category);
      updateExpense.update({
        expenseDate: expenseDate,
        expenseAmount: expenseAmount,
        description: description,
      });
      await updateExpense.save();
      result.message = `Expense ${expenseId} updated in DB`;
      result.status = 200;
      result.data = updateExpense;

      // console.log(`Expense ID ${expenseId} updated: `, JSON.stringify(result));
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

    if ((uid, expenseId)) {
      await Expense.destroy({ where: { id: expenseId, userId: uid } });
      result.message = `Expense ${expenseId} from ${uid} is deleted!`;
      result.status = 200;
    }

    return result;
  },
};
