// Create a new set of routes for protected
const express = require("express");
const router = express.Router(); // create route

// Import controller
const ExpenseController = require("../controllers/expenseController");
const UserController = require("../controllers/userController");

// Instantiate a new class instance
const expenseController = new ExpenseController();
const userController = new UserController();

// Expense routes GET POST PATCH DELETE
//
// route description: get all expenses per uid
router // header decodeToken: uid
  .route("/get")
  // .get((req, res) => res.send("You have called the FETCH EXPENSES route!"))
  .get(userController.findOrCreateUser, expenseController.getExpenses);

// route description: add single expense per uid
router // header decodeToken: uid
  .route("/add")
  .get((req, res) => res.send("You have called the ADD EXPENSES route!"))
  .post(userController.findOrCreateUser, expenseController.addExpense);

// route description: edit single expense per uid + expenseId
router // header decodeToken: uid + expenseId
  .route("/:expenseId/edit")
  .get((req, res) => res.send("You have called the EDIT EXPENSES route!"))
  .put(userController.findOrCreateUser, expenseController.editExpense);

// route description: delete single expense per uid + expenseId
router // header decodeToken: uid + expenseId
  .route("/:expenseId/delete")
  .get((req, res) => res.send("You have called the DELETE EXPENSE route!"))
  .delete(userController.findOrCreateUser, expenseController.deleteExpense);

module.exports = router;
