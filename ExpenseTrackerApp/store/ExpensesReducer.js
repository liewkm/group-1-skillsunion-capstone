/*-------------------------------------------------------------------  
  Reducers for expense context methods. Centralises all expenses 
  context related operations into a sigle file. Each reducer function 
  receives 2 arguments:
    
    1. state -> current state passed from context
    2. action -> { type, payload }
  
  Payload content changes according to action type.
*/

// Import dispatch constants {action.type} into consumer components

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const GET_ALL_EXPENSE = 'GET_EXPENSE';

function ExpensesReducer(state, action) {
  
  console.log('ExpensesReducer->action.type', action.type);
  switch (action.type) {
    
    /*-----------------------------------------------------------------
      Add Expense: payload -> new expense data
    */
    case ADD_EXPENSE:
      return [action.payload, ...state];

    /*-----------------------------------------------------------------
      Edit expense: payload.id   -> ID of item to edit
                    payload.data -> edited expense data
      
      1. Find the index for editing
      2. Copy the item for editing
      3. Over-write new data into update item
      4. Copy the entire state array
      5. Replace the updated item in the array
      6. Replace the the newly edited array
    */
    case EDIT_EXPENSE:
      const updateIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[updateIndex];
      const updateItem = { ...updateExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateIndex] = updateItem;
      return updatedExpenses;

    /*-----------------------------------------------------------------
      Remove expense: payload -> ID of item to delete
    */
    case REMOVE_EXPENSE:
      // Copy all items in state array, EXCEPT for the id item
      // indicated in action.payload
      return state.filter((expense) => expense.id !== action.payload);

    /*-----------------------------------------------------------------
      Get expense: payload --> array of expenses data fetched from server
    */
    case GET_ALL_EXPENSE:
      return action.payload.reverse()
    
    default:
      return state;
  }
}
export default ExpensesReducer;
