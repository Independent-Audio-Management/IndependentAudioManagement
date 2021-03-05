import React from "react";
import store from "./src/app/store";
// import AppStack from "./src/navigations/AppStack";
import Providers from "./src/navigations";

export default function App() {
  return <Providers store={store} />;
}
