/*----  
  Controller for expenses

  Available controllers:
    CREATE new expenses       - /add        -> add        
    READ all expenses         - /get        -> get
    UPDATE expense ref by ID  - /edit/:id   -> edit
    DELETE expense ref by ID  - /delete/:id -> delete
----*/

const expenseService = require('../services/expense-services.js');

class ExpenseController {
  
  async add(req, res) {
    console.log('ExpenseController.add->req.body', req.body);
    const { amount, spendAt, category, description, upc, userId } = req.body;

    // Validate inputs
    if (typeof amount !== 'number' ||
      typeof spendAt !== 'string' ||
      typeof category !== 'string' ||
      typeof description !== 'string' ||
      typeof upc !== 'string' ||
      typeof userId !== 'string'
    ) {
      res.status(400); // bad request
      return res.json({ message: 'ExpenseController.add BAD request'});
    }
    const result = await expenseService.add(
      amount, spendAt, category, description, upc, userId);
    console.log('ExpenseController.add->result', result);
    return res.json({ message: `ExpenseController->New expense item added OK`});
  }

  async get(req, res) {
    console.log('ExpenseController.get->req.body', req.body);
  }
  
  async edit(req, res) {
    console.log('ExpenseController.edit->req.body', req.body);
  }

  async delete(req, res) {
    console.log('ExpenseController.delete->req.body', req.body);
  }
}

module.exports = RecipeController