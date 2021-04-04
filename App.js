import React from "react";
import { Root } from "native-base";
import store from "./src/app/store";
// import AppStack from "./src/navigations/AppStack";
import Providers from "./src/navigations";

export default function App() {
  return (
    <Root>
      <Providers store={store} />
    </Root>
  );
}
