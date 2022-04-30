/*----  
  All Expenses screen
----*/

import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/ExpensesContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function AllExpenses() {
  const { expenses } = useContext(ExpensesContext)
  return (
    <ExpensesOutput 
      expenses={expenses}
      expensesPeriod='Total'
      fallbackText='No Expenses Yet.'
      />
  );
}

export default AllExpenses;