import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/ExpensesContext';
import { getDateMinusDays } from '../utilities/helpers';
import { getExpenses } from '../api/expenses-api';
import { GET_ALL_EXPENSE } from '../reducers/ExpensesReducer';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/commonUI/ErrorOverlay'
import LoadingOverlay from '../components/commonUI/LoadingOverlay'

function RecentExpenses() {
  const { expenses, dispatch } = useContext(ExpensesContext);

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  
  const errorHandler = () => {
    setError(null)
  }

  useEffect(() => {
    async function doGetExpenses() {
      setIsLoading(true)
      try {
        const data = await getExpenses()
        dispatch({ type: GET_ALL_EXPENSE, payload: data })
      } catch (error) {
        setError('Could not get expenses')
        console.log(error)
      }
      setIsLoading(false)      
    }
    doGetExpenses();
  }, [])
  
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isLoading) {
    return <LoadingOverlay />
  }
  
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
