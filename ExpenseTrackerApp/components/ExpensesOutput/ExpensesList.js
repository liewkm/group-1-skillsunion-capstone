/*----  
  Expenses list
----*/



import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;