/*----  
  Expenses output
----*/

import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

import { GlobalColors } from "../../utilities/colors";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  const [pickerValue, setPickerValue] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  const [filtered, setFiltered] = useState([...expenses]);

  // console.log(expenses)
  // console.log(filtered)

  // Check if there is any expense yet.
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  // LKM: Can I include some logic here to switch between <ExpensesList expenses={expenses} /> and <ExpensesList expenses={filtered} />?
  if (expenses.length > 0) {
  // if (expenses.length > 0 && expenses.category === pickerValue)
    content = <ExpensesList expenses={expenses} />;
    // content = <ExpensesList expenses={filtered} />;
  }

  // Filters out category items into an array for dropdown menu

  useEffect(() => {
    let array = [];
    expenses.forEach((item) => {
      array.push(item.category);
    });
    const unique = [...new Set(array)];
    console.log("useEffect->unique:", unique);
    setPickerItems(unique);
  }, [expenses]);

  // Updates selected category item from dropdown menu

  useEffect(() => {
    console.log("ExpensesOutput-->pickerValue", pickerValue);

    const filteredCategoryItems = expenses.filter((expense) => {
      return expense.category === pickerValue;
    });

    console.log(
      "ExpensesOutput-->filteredCategoryItems",
      filteredCategoryItems
    );
    setFiltered([...filteredCategoryItems]);
  }, [pickerValue, expenses]);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={filtered} periodName={expensesPeriod} />
    
      <Picker
        selectedValue={pickerValue}
        style={{ color: "white" }}
        dropdownIconColor={"white"}
        onValueChange={(value, index) => setPickerValue(value)}
      >
        {pickerItems.map((item, index) => {
          return <Picker.Item key={index} label={item} value={item} />;
        })}
      </Picker>
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalColors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
