/*---------------------------------------------------------------------------  
  Displays common input form for data entry.
  Props:
    onCancel       - Handler for cancel button
    onSubmit       - Handler for Submit (add/update) button
    submitBtnLabel - Label for Submit (add/update) button
    defaultValues  - Values passed from parent when updating an expense 
*/
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getFormattedDate } from '../../utilities/helpers.js';
import { GlobalColors } from '../../utilities/colors.js';
import { getUpcList } from '../../api/upc-api';
import BarcodeScanner from './BarcodeScanner';
import IconButton from '../commonUI/IconButton';
import Button from '../commonUI/Button';
import Input from './Input';

function ExpensesForm({ onCancel, onSubmit, submitBtnLabel, defaultValues }) {
  
  // States for validation
  const [validAmount, setValidAmount] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validDescp, setValidDescp] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [formNotValid, setFormNotValid] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // States for input fields
  const [date, setDate] = useState(new Date(Date.now())); 
  const [inputs, setInputs] = useState({
    date: defaultValues
      ? getFormattedDate(defaultValues.date)
      : getFormattedDate(date),
    amount: defaultValues ? defaultValues.amount.toString() : "",
    description: defaultValues ? defaultValues.description : "",
    category: defaultValues ? defaultValues.category : "",    
  });
  // States for BarcodeScanner
  const [upcList, setUpcList] = useState([])
  const [upc, setUpc] = useState(null);                 // UPC String
  const [isUpcFound, setIsUpcFound] = useState(true);   // Is the UPC in database (true/false)
  
  // State for camera modal window 
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  /*-----------------------------------------------------------
    Input handlers
  */
  const inputsChangeHandler = (inputType, enterValue) => {
    setInputs((current) => {
      return { ...current, [inputType]: enterValue };
    });
  };
  
  /*-----------------------------------------------------------
    Date picker handlers
  */
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

  /*-----------------------------------------------------------
    Submit (add/update) button handlers
  */
  const submitHandler = () => {
    setFormNotValid(false);
    const data = {
      date: new Date(inputs.date),
      amount: +inputs.amount, // + converts to number
      description: inputs.description,
      category: inputs.category,
    };

    const validAmount = !isNaN(data.amount) && data.amount > 0;
    const validDate = data.date.toString() !== "Invalid Date";
    const validDescp = data.description.trim().length > 0;
    const validCategory = data.category.trim().length > 0;

    setValidAmount(validAmount);
    setValidDate(validDate);
    setValidDescp(validDescp);
    setValidCategory(validCategory);

    if (validDate && validAmount && validDescp && validCategory) {
      onSubmit(data);
    } else {
      setFormNotValid(true);
    }
  };

  /*-----------------------------------------------------------
    Barcode scanner button handler
    Takes UPC string and compares it to a list of known UPCs.
    Returns a product information and fills up input fields, 
    or empty form is no UPC is matched
  */
  const scanHandler = (upc) => {
    console.log('scanHandler->upc:', upc, typeof(upc));
    setUpc(upc);
    const index = upcList.findIndex((item) => item.upc === upc)
    console.log('scanHandler->index:', index);
    if (index > 0) {
      setIsUpcFound(true);
      setInputs({
        date: getFormattedDate(date),
        category: upcList[index].category,
        description: upcList[index].description,
        amount: upcList[index].price.toString()
      })
    } else {
      setIsUpcFound(false);
      setInputs({
        date: getFormattedDate(date),
        category: '',
        description: '',
        amount: ''
      })
    }
  }
  /*-----------------------------------------------------------------
    Setup UPC list for matching on component mount
  */
  useEffect(() => {
    async function doGetUpcList() {
      try {
        const data = await getUpcList()
        setUpcList(data)
      } catch (error) {
        console.log(error);
      }
    }
    doGetUpcList()
  }, [])

  //-------------------------------------------------------------------  
  
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
        <Button style={styles.button} onPress={onCancel}>
          CANCEL
        </Button>
        <IconButton
          onPress={() => setIsCameraVisible(true)}
          icon='barcode-outline'
          color={GlobalColors.primary50}
          size={35}
        />
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLabel}
        </Button>
      </View>
      {upc && <Text style={styles.text}>UPC scanned: {upc}</Text>}
      {!isUpcFound && <Text style={styles.text}>NOT FOUND!</Text>}

      <Modal
        animationType='fade'
        transparent={true}
        visible={isCameraVisible}
        onRequestClose={() => {
          setIsCameraVisible(!isCameraVisible);
        }}
      >
        <View style={styles.centeredView}>
          <BarcodeScanner
            scanHandler={scanHandler}
            setIsCameraVisible={setIsCameraVisible}
          />
        </View>
      </Modal>

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

const styles = StyleSheet.create({
  container: { 
    marginTop: 0 
  },
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
  text: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
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
    minWidth : "49%",
    backgroundColor: GlobalColors.primary50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'cyan',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  // },
  modalView: {
    width: 350,
    height: 400,
    alignItems: "center",
    elevation: 5
  },
});

export default ExpensesForm;
