import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';

// Login Screen UI changes
import Button from '../components/commonUI/Button';
import Input from '../components/commonUI/Input';
import { GlobalColors } from '../utilities/colors';

export default function Login({ navigation }) {
  const [values, setValues] = useState({
    email: '',
    pwd: '',
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function Login() {
    const { email, pwd } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {})
      .catch((error) => {
        alert(error.message);
        // ..
      });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <Input
          inputLabel='Email Address'
          inputConfig={{
            onChangeText: (text) => handleChange(text, 'email')
          }}
        />
        <Input
          inputLabel='Password'
          inputConfig={{
            onChangeText: (text) => handleChange(text, 'pwd'),
            secureTextEntry: true
          }}
        />
        <View style={styles.buttonRow}>
          <Button style={styles.button} onPress={Login}>
            Login
          </Button>
          <Button style={styles.button} onPress={() => navigation.navigate('Sign Up')} mode='flat'>
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.primary800,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: GlobalColors.primary50,
    paddingVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

