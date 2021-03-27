import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AdminPincodeScreen from "../screens/Admin/AdminPincodeScreen";
import AdminTaskScreen from "../screens/Admin/AdminTaskScreen";
import HomeScreen from "../screens/HomeScreen";
import CongratsScreen from "../screens/User/CongratsScreen";
import InstructionScreen from "../screens/User/InstructionScreen";
import QRScreen from "../screens/User/QRScreen";
import TaskScreen from "../screens/User/TaskScreen";
import AdminTaskEditScreen from "../screens/Admin/AdminTaskEditScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QR" component={QRScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="InstructionScreen" component={InstructionScreen} />
      <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
      <Stack.Screen name="AdminTask" component={AdminTaskScreen} />
      <Stack.Screen name="AdminPincode" component={AdminPincodeScreen} />
      <Stack.Screen name="AdminTaskEdit" component={AdminTaskEditScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
