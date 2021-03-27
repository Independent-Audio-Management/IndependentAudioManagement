import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { auth } from "../utils/firebase";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthUserContext } from "./AuthUserProvider";
import navigationTheme from "./navigationTheme";

export default function Routes() {
  const { user, setUser } = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        console.log(authUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
