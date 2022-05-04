/*----  
  Routing endpoints for expenses
----*/

const express = require('express');

// Create route
const router = express.Router();

// Import and instantiate new controller
const ExpenseController = require('../controllers/expense-controller');
const expenseController = new ExpenseController();

/*----------------------------------------------
  Available endpoints:
    CREATE new expenses       - /add         
    READ all expenses         - /get        
    UPDATE expense ref by ID  - /edit/:id
    DELETE expense ref by ID  - /delete/:id
-----------------------------------------------*/

router.route('/expense/add').get((req, res) => {
  res.send('SUCCESS: /add route called');
});

router.route('/expense/get').get((req, res) => {
  res.send('SUCCESS: /get route called');
});

router.route('/expense/edit/:id').get((req, res) => {
  res.send('SUCCESS: /edit route called');
});

router.route('/expense/delete/:id').get((req, res) => {
  res.send('SUCCESS: /delete route called');
});
