/*----  
  Expenses output
----*/

import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

import { GlobalColors } from "../../utilities/colors";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText, isAllCategories }) {
  const [pickerValue, setPickerValue] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  const [filtered, setFiltered] = useState([...expenses]);

  // Check if there is any expense yet.
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  // Check if database (expenses) exists? If yes, (a) list All Categories (b) list Selected Category. Else fallbackText.  
  if (expenses.length > 0) {
    if (isAllCategories) {
      content = <ExpensesList expenses={expenses} />
    } else
      content = <ExpensesList expenses={filtered} />
  }

  // Filters out category items into an array for dropdown menu

  useEffect(() => {
    let array = [];
    expenses.forEach((item) => {
      array.push(item.category);
    });
    const unique = [...new Set(array)];
    // console.log("useEffect->unique:", unique);
    setPickerItems(unique);
  }, [expenses]);

  // Updates selected category item from dropdown menu

  useEffect(() => {
    // console.log("ExpensesOutput-->pickerValue", pickerValue);

    const filteredCategoryItems = expenses.filter((expense) => {
      return expense.category === pickerValue;
    });
    setFiltered([...filteredCategoryItems]);
  }, [pickerValue, expenses]);

  return (
    <View style={styles.container}>
      {isAllCategories &&
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      }
      {!isAllCategories &&
        <ExpensesSummary expenses={filtered} periodName={expensesPeriod} />
      }
      {!isAllCategories && 
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
      }
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
