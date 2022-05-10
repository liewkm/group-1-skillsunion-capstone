/*-----------------------------------------------------------------------------
  API controller methods 
  - Copy to expenses-api.js file when using postgres backend
*/

import axios from 'axios';

// Use local IP address if 'localhost' does not work
// const BACKEND_URL = 'http://localhost:5000'
const BACKEND_URL = 'https://expense-react-native-db.herokuapp.com'

/*-----------------------------------------------------------------------------
  HTTP POST method to add new expenses
*/

export async function postExpense(expenseData, token) {
  // console.log('postExpense->expenseData:', expenseData);
  const body = {
    expenseDate: expenseData.date.toISOString().substring(0, 10 ),
    expenseAmount: expenseData.amount,
    description: expenseData.description,
    categoryType: expenseData.category
  }
  console.log('postExpense->body:', body);
  const response = await axios.post(BACKEND_URL + '/api/expense/add', body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "axios 0.21.1"
    }
  });
  const id = response.data.data.id;
  console.log('postExpense->id:', id);
  return id;
}

/*-----------------------------------------------------------------------------
  HTTP GET method to fetch all expenses
*/

export async function getExpenses(token) {
  console.log('getExpenses->token', token);

  const response = await axios.get(BACKEND_URL + '/api/expense/get', {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "axios 0.21.1"
    }
  })
  const expenses = [];
  for (const item of response.data.data) {
    const expenseObj = {
      id: item.id,
      amount: parseFloat(item.expenseAmount),
      date: new Date(item.expenseDate),
      description: item.description,
      category: item.Categories[0].type,
    }
    expenses.push(expenseObj)
  }
  console.log('getExpenses->expenses:', expenses);
  return expenses;
}

/*-----------------------------------------------------------------------------
  HTTP UPDATE method to replace expense data on existing id
*/

export function updateExpense(id, expenseData, token) {
  const body = {
    expenseDate: expenseData.date,
    expenseAmount: expenseData.amount,
    description: expenseData.description,
    categoryType: expenseData.category
  }
  return axios.put(BACKEND_URL + `/api/expense/${id}/edit`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "axios 0.21.1"
    }
  });
}

/*-----------------------------------------------------------------------------
  HTTP DELETE method to delete expense record 
*/

export function deleteExpense(id, token) {
  console.log('deleteExpense->id:', id);
  return axios.delete(BACKEND_URL + `/api/expense/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "axios 0.21.1"
    }
  });
}