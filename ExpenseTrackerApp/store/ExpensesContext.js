/*-------------------------------------------------------------------  
  Global context for storing expenses data to be shared amongst
  various components without having to use prop-drilling. ExpensesContext
  object passes value={{expenses, dispatch}} with useReducer hook
  to centralise all expenses context operations
*/

import { createContext, useReducer } from 'react';
import ExpensesReducer from './ExpensesReducer';

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