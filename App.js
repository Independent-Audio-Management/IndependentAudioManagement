import React from "react";
import { Provider } from "react-redux";
import store from "./src/app/store";
import AppStack from "./src/navigations/AppStack";
export default function App() {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}
