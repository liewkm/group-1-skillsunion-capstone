/*----  
  Manage Expense screen
----*/

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ExpensesForm from "../components/ExpensesInput/ExpensesForm";
import IconButton from "../components/commonUI/IconButton";
import LoadingOverlay from '../components/commonUI/LoadingOverlay';
import ErrorOverlay from '../components/commonUI/ErrorOverlay';
import { ExpensesContext } from "./../store/ExpensesContext";
import { GlobalColors } from "../utilities/colors";
import { deleteExpense, postExpense } from '../utilities/api';
import {
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  ADD_EXPENSE,
} from "../reducers/ExpensesReducer";

function ManageExpense({ route, navigation }) {
  const { expenses, dispatch } = useContext(ExpensesContext);
  
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState()

  const editedExpenseId = route.params?.expenseId; // Optional chaining
  const isEditing = !!editedExpenseId; // Convert value to boolean

  const selectedExpense = expenses.find((exp) => exp.id === editedExpenseId);

  //---
  // Error handler
  //---
  const errorHandler = () => {
    setError(false);
  };


  //---
  // Cancel handler
  //---
  const cancelHandler = () => {
    navigation.goBack();
  };
  
  //---
  // Confirm  handler
  //---
  const confirmHandler = async (expenseData) => {
    console.log("expenseData : ", expenseData);
    setIsSaving(true)
    try {
      if (isEditing) {
        dispatch({
          type: EDIT_EXPENSE,
          payload: {
            id: editedExpenseId,
            data: expenseData,
          },
        })
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await postExpense(expenseData)
        // dispatch({ type: ADD_EXPENSE, payload: expenseData });
        dispatch({ type: ADD_EXPENSE, payload: {...expenseData, id: id} });
      }
      navigation.goBack();
    } catch (error) {
      setError(`Could not ${isEditing ? 'update' : 'add'} expense`)
      setIsSaving(false)
    }
  };
  
  //---
  // Delete handler
  //---
  const deleteExpenseHandler = async () => {
    setIsSaving(true)
    try {
      await deleteExpense(editedExpenseId)
      dispatch({ type: REMOVE_EXPENSE, payload: editedExpenseId });
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense!')
      setIsSaving(false)
    }
  };
  
  //---
  // Hooks
  //---
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  //---
  // Conditional rendering
  //---
  if (error && !isSaving) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isSaving) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpensesForm
        submitBtnLabel={isEditing ? "UPDATE" : "ADD"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        navigation={navigation}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalColors.primary50}
            size={38}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalColors.primary800,
  },
  deleteContainer: {
    alignItems: "center",
    marginVertical: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.primary50,
  },
});
export default ManageExpense;
