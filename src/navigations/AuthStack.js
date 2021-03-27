import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AdminLoginScreen from "../screens/Admin/AdminLoginScreen";
// import DisclaimerScreen from '../screens/DisclaimerScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={AdminLoginScreen} />
    </Stack.Navigator>
  );
}
