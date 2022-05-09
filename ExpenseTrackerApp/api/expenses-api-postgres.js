/*-----------------------------------------------------------------------------
  API controller methods
*/

import axios from 'axios';

const BACKEND_URL = 'postgres://kbvhaywagrypyq:04ac20b125a7a0be031f4c99e296b371d31705f0ae07abd02bf23fabda3bf1cc@ec2-44-194-92-192.compute-1.amazonaws.com:5432/dbluvk65ld9kle'

/*-----------------------------------------------------------------------------
  HTTP POST method to add new expenses
*/

export async function postExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/api/expenses/add', expenseData);
  const id = response.data.name;
  return id;
}

/*-----------------------------------------------------------------------------
  HTTP GET method to fetch all expenses
*/

export async function getExpenses() {
  const response = await axios.get(BACKEND_URL + '/api/expenses/get')
  const expenses = [];
  
  console.log('getExpenses->response.data', response.data);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      category: response.data[key].category,
    }
    expenses.push(expenseObj)
  }
  return expenses;
}

/*-----------------------------------------------------------------------------
  HTTP UPDATE method to replace expense data on existing id
*/

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/api/expenses/${id}/edit`, expenseData);
}

/*-----------------------------------------------------------------------------
  HTTP DELETE method to delete expense record 
*/

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/api/expenses/${id}/delete`);
}