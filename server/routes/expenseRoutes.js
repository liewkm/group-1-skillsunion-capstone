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
*/

router
  .route("/get")
  // .get((req, res) => res.send("You have called the FETCH EXPENSES route!"))
  .get(userController.findOrCreateUser, expenseController.getExpenses);

router
  .route("/add")
  // .get((req, res) => res.send("You have called the ADD EXPENSES route!"))
  .post(userController.findOrCreateUser, expenseController.addExpense);

router
  .route("/:expenseId/edit")
  // .get((req, res) => res.send("You have called the EDIT EXPENSES route!"))
  .put(userController.findOrCreateUser, expenseController.editExpense);

router
  .route("/:expenseId/delete")
  // .get((req, res) => res.send("You have called the DELETE EXPENSE route!"))
  .delete(userController.findOrCreateUser, expenseController.deleteExpense);

module.exports = router;
