/*---- 
  NTU-SDI Cohort 3 (2022)
  Group 1 Project Module 4: Expense Tracker App 
  Group Members:
    King Mann
    Maniraja
    Charles
    Leslie
    Keith
    CP
----*/

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { GlobalColors } from './utilities/colors';
import ExpensesContextProvider from './store/ExpensesContext';
import ExpensesOverview from './screens/ExpensesOverview';
import ManageExpense from './screens/ManageExpense';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Login and SignUp with Firebase authentication
import Login from './screens/Login';
import Logout from './screens/Logout';
import Signup from './screens/Signup';

import firebase from 'firebase/compat';
import { firebaseConfig } from './firebase-config';

// UserContext to store user token from authentication server
import { UserContext } from './store/UserContext';

//------------------------------------------------------------------

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  /*------------------------------------------------------------------
    Sets isLoggedIn flag when user is authenticated by Firebase
    and logged in with token, which enables conditional rendering
    of either Login/Signup or Expenses Overview screens
  */
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setIsLoggedIn(true);
        user.getIdToken().then((idToken) => {
          setToken(idToken);
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [])
  
  //------------------------------------------------------------------
  
  return (
    <>
      <StatusBar style='light' />
        <ExpensesContextProvider>
          <NavigationContainer>
            
            {/* Conditional rendering according to user authentication status */}
            {(isLoggedIn && token) ? (
              <UserContext.Provider value={token}>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: { backgroundColor: GlobalColors.primary500 },
                    headerTintColor: 'white',
                  }}
                >
                  {/* Main expenses overview screen */}
                  <Stack.Screen
                    name='ExpensesOverview'
                    component={ExpensesOverview}
                    options={{ headerShown: false }}
                  />
                  {/* Input form screen */}
                  <Stack.Screen
                    name='ManageExpense'
                    component={ManageExpense}
                    options={{ presentation: 'modal' }}
                  />
                  {/* Signout --> logout screen */}
                  <Stack.Screen
                    name='Logout'
                    component={Logout}
                    options={{ presentation: 'modal' }}
                  />
                </Stack.Navigator>
              </UserContext.Provider>
            ) : (
              <Stack.Navigator>
                {/* Login screen */}
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{ headerShown: false }}
                />
                {/* Signup screen */}
                <Stack.Screen
                  name='Sign Up'
                  component={Signup}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </ExpensesContextProvider>
    </>
  );
}

