/*----  
  Expense input form 
----*/
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { GlobalColors } from "../../utilities/colors";
import { getFormattedDate } from "../../utilities/helpers.js";
import Button from "../commonUI/Button.js";
import Input from "./Input";
import BarcodeScanner from "../../screens/BarcodeScanner";
import { getUpcList } from "../../api/upc-api";
/*
const DUMMY_UPC_LIST=[
  { upc: 8887319426163, category: 'Medical', description: 'Zyrtec-R tablets', price: '12.85' },
  { upc: 9781607747307, category: 'Books', description: 'Marie Kondo: The Life-Changing Magic of Tidying Up', price: '19.99' },
  { upc: 8887603535953, category: 'Medical', description: 'Guardian Vitamin C 1000mg 60 tablets', price: '5.95' },
  { upc: 8887066000067, category: 'Stationery', description: 'SureMark reinforcement rings 6mm 500pcs', price: '2.50' },
]
*/
function ExpensesForm({ onCancel, onSubmit, submitBtnLabel, defaultValues, navigation }) {
  const [validAmount, setValidAmount] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validDescp, setValidDescp] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [formNotValid, setFormNotValid] = useState(false);

  const [date, setDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [inputs, setInputs] = useState({
    date: defaultValues
      ? getFormattedDate(defaultValues.date)
      : getFormattedDate(date),
    amount: defaultValues ? defaultValues.amount.toString() : "",
    description: defaultValues ? defaultValues.description : "",
    category: defaultValues ? defaultValues.category : "",
    
  });
  const [upcList, setUpcList] = useState([])

  // Props for BarcodeScanner
  const [upc, setUpc] = useState(null)

  const inputsChangeHandler = (inputType, enterValue) => {
    setInputs((current) => {
      return { ...current, [inputType]: enterValue };
    });
  };
  const showMode = () => setShowDatePicker(true);

  const onChangeDatePicker = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    const currentDate = selectedDate || date;

    setDate(currentDate);
    let tempDate = getFormattedDate(currentDate);

    setInputs((current) => {
      return { ...current, ["date"]: tempDate };
    });

  };

  const submitHandler = () => {
    setFormNotValid(false);

    const data = {
      date: new Date(inputs.date),
      amount: +inputs.amount, // + converts to number
      description: inputs.description,
      category: inputs.category,
    };

    console.log("******** inputs object: ", inputs);

    const validAmount = !isNaN(data.amount) && data.amount > 0;
    const validDate = data.date.toString() !== "Invalid Date";
    const validDescp = data.description.trim().length > 0;
    const validCategory = data.category.trim().length > 0;

    setValidAmount(validAmount);
    setValidDate(validDate);
    setValidDescp(validDescp);
    setValidCategory(validCategory);
    // console.log(validDate, validAmount, validDescp, validCategory);

    if (validDate && validAmount && validDescp && validCategory) {
      onSubmit(data);
    } else {
      setFormNotValid(true);
    }
  };

  const scanHandler = (upc) => {
    console.log('scanHandler:', upc, typeof(upc));
    setUpc(upc)
    const index = upcList.findIndex((item) => item.upc === upc)
    console.log(index);
    setInputs({
      date: getFormattedDate(date),
      category: upcList[index].category,
      description: upcList[index].description,
      amount: upcList[index].price.toString()
    })
  }

  useEffect(() => {
    async function doGetUpcList() {
      try {
        const data = await getUpcList()
        console.log(data);
        setUpcList(data)
      } catch (error) {
        console.log(error);
      }
    }
    doGetUpcList()
  }, [])

  // console.log("submitBtnLabel: ", submitBtnLabel);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense</Text>
      <View style={styles.row}>
        <Pressable onPress={() => showMode()}>
          <Input
            style={styles.rowInput}
            inputLabel='Date'
            inputConfig={{
              maxLength: 10,
              showSoftInputOnFocus: false, // dismiss kkeyboard
              keyboardType: 'number-pad',
              onChangeText: inputsChangeHandler.bind(this, 'date'),
              value: inputs.date,
              onPressIn: () => showMode(), // allows input area pressable
            }}
            invalid={!validDate}
          />
        </Pressable>
        <Input
          style={styles.rowInput}
          inputLabel='Amount'
          inputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputsChangeHandler.bind(this, 'amount'),
            value: inputs.amount,
          }}
          invalid={!validAmount}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display='default'
          onChange={onChangeDatePicker}
        />
      )}

      {/* display DatePicker input */}

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={inputs.category}
          style={styles.picker}
          dropdownIconColor={GlobalColors.primary100}
          onValueChange={(itemValue) => {
            console.log('itemValue', itemValue)
            setInputs((current) => {
              return { ...current, ['category']: itemValue };
            });
          }}
        >
          <Picker.Item label='Please select category:' enabled={false} />
          <Picker.Item label='Clothing' value='Clothing' />
          <Picker.Item label='IT Electronics' value='IT Electronics' />
          <Picker.Item label='Food' value='Food' />
          <Picker.Item label='Household' value='Household' />
          <Picker.Item label='Stationery' value='Stationery' />
          <Picker.Item label='Entertainment' value='Entertainment' />
          <Picker.Item label='Transport' value='Transport' />
          <Picker.Item label='Books' value='Books' />
          <Picker.Item label='Medical' value='Medical' />
        </Picker>
      </View>

      <Input
        inputLabel='Description'
        inputConfig={{
          multiline: true,
          onChangeText: inputsChangeHandler.bind(this, 'description'),
          value: inputs.description,
        }}
        invalid={!validDescp}
      />
      <View style={styles.buttonRow}>
        <Button style={styles.button} onPress={onCancel} mode='flat'>
          CANCEL
        </Button>
        {/* <IconButton style={styles.button} onPress={() => navigation.navigate('BarcodeScanner')}
          icon='camera'
          color={GlobalColors.primary50}
          size={38}
        /> */}
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLabel}
        </Button>
      </View>
      <Text style={styles.label}>UPC Scanned: {upc}</Text>

      <BarcodeScanner scanHandler={scanHandler}/>
      
      {formNotValid && (
        <Text style={styles.errorOutput}>
          Invalid Entry, Please Check Entry Again!
        </Text>
      )}
      {!validCategory && (
        <Text style={styles.errorOutput}>Please Choose a Category!</Text>
      )}
    </ScrollView>
  );
}

export default ExpensesForm;
const styles = StyleSheet.create({
  container: { marginTop: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalColors.primary50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  errorOutput: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    color: GlobalColors.error50,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginLeft: 8,
    color: GlobalColors.primary100,
  },
  picker: {
    fontSize: 16,
    backgroundColor: GlobalColors.primary100,
    color: GlobalColors.primary800,
    padding: 8,
    borderRadius: 8,
    minWidth : "49%"
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 0,
    margin: 8,
    overflow: 'hidden',
    minWidth : "49%"
  },

});
