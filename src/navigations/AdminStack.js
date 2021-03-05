import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AdminTaskScreen from "../screens/Admin/AdminTaskScreen";

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminTask" headerMode="none">
      <Stack.Screen name="AdminTask" component={AdminTaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
