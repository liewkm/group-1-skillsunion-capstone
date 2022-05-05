/*----  
  API controller methods
----*/

import axios from 'axios';

const BACKEND_URL = 'https://rn-skillsunion-capstone-default-rtdb.asia-southeast1.firebasedatabase.app';

//----
// HTTP POST method to add new expenses
//----

export async function postExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

//----
// HTTP GET method to fetch all expenses
//----

export async function getExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json')
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

//----
// HTTP UPDATE method to replace expense data on existing id
//----

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

//----
// HTTP DELETE method to delete expense record 
//----

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}