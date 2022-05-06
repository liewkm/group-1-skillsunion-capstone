/*----  
  Expense Overview screen
----*/

import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../utilities/colors";
import IconButton from "../components/commonUI/IconButton";
import AllExpenses from "./AllExpenses";
import RecentExpenses from "./RecentExpenses";
<<<<<<< Updated upstream
=======
import AllCategories from "./AllCategories";
// import HomeScreen from "./HomeScreen";

>>>>>>> Stashed changes

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Button from "../components/commonUI/Button";
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalColors.primary500 },
        headerTintColor: GlobalColors.primary100 ,
        tabBarStyle: { backgroundColor: GlobalColors.primary700 },
        tabBarActiveTintColor: GlobalColors.accent500,
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="home"
            size={28}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={28}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
       <BottomTabs.Screen
        name="HomeScreen"
        component={AllExpenses}
        options={{
          title: "Home Expenses",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ExpensesCategories"
        component={ExpensesCategories}
        options={{
          title: 'Expenses Categories',
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default ExpensesOverview;
