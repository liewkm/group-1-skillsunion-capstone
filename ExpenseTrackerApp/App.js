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

import { useState, createContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { GlobalColors } from './utilities/colors';
import ExpensesContextProvider, { ExpensesContext } from './store/ExpensesContext';
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

import { UserContext } from './store/UserContext';
// export const UserTokenContext = createContext(null);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

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
          console.log('Firebase user idToken:', idToken);
          setToken(idToken);
        });
        // console.log('Firebase user credentials:', user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [])
  
  return (
    <>
      <StatusBar style='light' />
        <ExpensesContextProvider>
          <NavigationContainer>
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
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{ headerShown: false }}
                />
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

