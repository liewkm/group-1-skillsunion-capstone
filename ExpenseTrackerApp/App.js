
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesContextProvider from './store/ExpensesContext';
import HandleSignOut from './screens/Signout';
import LoginScreen from "./screens/Login"
import SignUpScreen from "./screens/SignUp"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ExpensesOverview from './screens/ExpensesOverview';
import ManageExpense from './screens/ManageExpense';
import BarcodeScanner from './screens/BarcodeScanner';

const Stack = createNativeStackNavigator();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyA46D9SsuqZDoW_7zegzhxRqOomgoaxM6o",
    authDomain: "expence-a2da3.firebaseapp.com",
    projectId: "expence-a2da3",
    storageBucket: "expence-a2da3.appspot.com",
    messagingSenderId: "76323240906",
    appId: "1:76323240906:web:e879e4403e9aa2832a6d33"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
    <StatusBar style='light' />
    <ExpensesContextProvider>

    <NavigationContainer>
    
      {isLoggedIn ? <Stack.Navigator>

            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name='BarcodeScanner'
              component={BarcodeScanner}
              options={{
                presentation: 'modal',
              }}
            />    

            <Stack.Screen
              name='Signout'
              component={HandleSignOut}
              options={{
                presentation: 'modal',
              }}
            />        

      </Stack.Navigator> :
        <Stack.Navigator>

          <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
          />

          <Stack.Screen 
          name="Sign Up" 
          component={SignUpScreen} 
          options={{ headerShown: false }} 
          />

        </Stack.Navigator>}
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
  );
}

export default App;
