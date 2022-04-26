/*----  
  Global context
----*/

import { createContext, useReducer } from 'react';
import ExpensesReducer from '../reducers/ExpensesReducer';

// Create context objext

export const ExpensesContext = createContext()

function ExpensesContextProvider({ children }) {
  
  const [expenses, dispatch] = useReducer(ExpensesReducer, [])
  
  return (
    <ExpensesContext.Provider value={{expenses, dispatch}}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider;