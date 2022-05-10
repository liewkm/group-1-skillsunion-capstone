// Create a new set of routes
const express = require("express");
const router = express.Router();

// Import controller and instantiate new instances
const ExpenseController = require("../controllers/expenseController");
const UserController = require("../controllers/userController");
const expenseController = new ExpenseController();
const userController = new UserController();

/*  Expense-tracker GET POST PUT DELETE routes description:
- route("/get") description: get all expenses per uid
- route("/add") description: add single expense per uid
- route("/:expenseId/edit") description: edit single expenseId per uid 
- route("/:expenseId/delete") description: delete single expenseId per uid 

GET POST PUT DELETE routes execution will always pass thru userController 
before expenseController  */
router
  .route("/get")
  .get(userController.findOrCreateUser, expenseController.getExpenses);

router
  .route("/add")
  .post(userController.findOrCreateUser, expenseController.addExpense);

router
  .route("/:expenseId/edit")
  .put(userController.findOrCreateUser, expenseController.editExpense);

router
  .route("/:expenseId/delete")
  .delete(userController.findOrCreateUser, expenseController.deleteExpense);

module.exports = router;
