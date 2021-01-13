import React from "react";
import store from "./src/app/store";
import { Provider } from "react-redux";
import AppStack from "./src/navigations/AppStack";
export default function App() {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}
