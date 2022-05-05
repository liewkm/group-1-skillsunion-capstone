// execute to DB model
const { User, Expense, ExpenseCategory, Category } = require("../models");

User.sync({ alter: true }).then(() => console.log("User Database is ready"));
Expense.sync({ alter: true }).then(() =>
  console.log("Expense Database is ready")
);
ExpenseCategory.sync({ alter: true }).then(() =>
  console.log("ExpenseCategory Database is ready")
);
Category.sync({ alter: true }).then(() => {
  console.log("Category Database is ready");
  // Category.bulkCreate([
  //   {
  //     type: "Clothing",
  //   },
  //   {
  //     type: "Computing Hardware",
  //   },
  //   {
  //     type: "Food",
  //   },
  //   {
  //     type: "Hobby",
  //   },
  //   {
  //     type: "Household",
  //   },
  //   {
  //     type: "Stationary",
  //   },
  //   {
  //     type: "Social",
  //   },
  //   {
  //     type: "Transport",
  //   },
  // ]);
});

module.exports = {
  getExpenses: async (uid) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const allExpenses = await Expense.findAll(
      { where: { userId: uid } },
      { include: Category }
    );

    if (allExpenses) {
      result.message = `All Expenses from ${uid} fetched successfully from DB`;
      result.status = 200;
      result.data = allExpenses;

      console.log(`All Expenses from ${uid} fetched: `, JSON.stringify(result));
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

    const [newExpense, created] = await Expense.findOrCreate({
      where: {
        // userId: user.id,
        expenseDate: expenseDate,
        expenseAmount: expenseAmount,
        description: description,
      },
    });

    const category = await Category.findOrCreate({
      where: {
        type: categoryType,
      },
    });

    if (created) {
      // association
      await user.addExpense(newExpense);
      await category.addExpense(newExpense);

      await newExpense.save();
      await category.save();

      result.status = 201;
      result.message = "New Expense created in Expense table";
    } else {
      result.status = 400;
      result.message = "Expense exists in Expense table";
    }

    result.data = newExpense;

    console.log("Expense Result: ", JSON.stringify(result));
    console.log(Expense, ExpenseCategory);

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

    const updateExpense = await Expense.findOne(
      { where: { id: expenseId, userId: uid } },
      { include: Category }
    );

    updateExpense.set({
      expenseDate: expenseDate,
      expenseAmount: expenseAmount,
      description: description,
    });

    updateExpense.setCategory({ type: categoryType });

    updateExpense = await updateExpense.save();
    updateExpense.Category = await updateExpense.Category.save();

    if (updateExpense) {
      result.message = `Expense ${expenseId} updated in DB`;
      result.status = 200;
      result.data = updateExpense;

      console.log(`Expense ID ${expenseId} updated: `, JSON.stringify(result));
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

    await Expense.destroy(
      { where: { id: expenseId, userId: uid } }
      // { include: Category }
    ).then((uid, expenseId, result) => {
      result.message = `Expense ${expenseId} from ${uid} is deleted!`;
      result.status = 200;
    });

    return result;
  },
};
