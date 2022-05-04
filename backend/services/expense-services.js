/*----  
  Controller for expenses

  Available controllers:
    CREATE new expenses       - /add        -> add        
    READ all expenses         - /get        -> get
    UPDATE expense ref by ID  - /edit/:id   -> edit
    DELETE expense ref by ID  - /delete/:id -> delete
----*/

// Database tables
const { Expenses } = require('../models')

Expenses
  .sync({ alter: true })
  .then(() => console.log('Expenses database sync and ready!'));

module.exports = {
  add: async (amount, spendAt, category, description, upc, userId) => {
    console.log(`ExpenseService: add item '${description}'`);
    let result = {
      message: null,
      status: null,
      data: null,
    }
    const newExpense = await Expenses.create({
      amount: amount,
      spendAt: spendAt,
      category: category,
      description: description,
      upc: upc,
      user: userId,
    })
    return result;
  },
  get: async (userId) => {
    console.log(`ExpenseService: get all expenses'`);
    let result = {
      message: null,
      status: null,
      data: null,
    }
    // TO-DO
  },
  edit: async (expenseId, amount, spendAt, category, description, upc, userId) => {
    console.log(`ExpenseService: edit ${expenseId} of user ${userId}'`);
    let result = {
      message: null,
      status: null,
      data: null,
    }
    // TO-DO
  },
  delete: async (expenseId, userId) => {
    console.log(`ExpenseService: get all expenses'`);
    let result = {
      message: null,
      status: null,
      data: null,
    }
    // TO-DO
  }


}