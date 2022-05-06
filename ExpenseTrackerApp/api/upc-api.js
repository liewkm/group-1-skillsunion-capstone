/*----  
  API controller methods
----*/

import axios from 'axios'

const BACKEND_URL = https://expensereactnative-b8ec4-default-rtdb.asia-southeast1.firebasedatabase.app

//----
// HTTP GET method to fetch all expenses
//----

export async function getUpcList() {
  const response = await axios.get(BACKEND_URL + '/upc.json')
  const upcList = [];
  
  console.log('getUpcList()->response.data', response.data);
  for (const key in response.data) {
    const obj = {
      id: key,
      category: response.data[key].category,
      description: response.data[key].description,
      price: response.data[key].price,
      upc: response.data[key].upc,
    }
    upcList.push(obj)
    console.log('getUpcList()->upcList', upcList);
  }
  return upcList;
}

