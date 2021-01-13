import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import QRScreen from "../screens/User/QRScreen";
import TaskScreen from "../screens/User/TaskScreen";
import { NavigationContainer } from "@react-navigation/native";
import InstructionScreen from "../screens/User/InstructionScreen";
import CongratsScreen from "../screens/User/CongratsScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
        <Stack.Screen name="InstructionScreen" component={InstructionScreen} />
        <Stack.Screen name="CongratsScreen" component={CongratsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
