import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
import { loginWithEmail } from "../../utils/firebase";

export default function AdminLoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const icon = <Ionicons name="ios-mail" size={32} color="black" />;
  return (
    <LoginScreen
      disableSettings
      source={require("../../assets/images/loginSplash.png")}
      spinnerEnable
      spinnerVisibility={spinnerVisibility}
      usernamePlaceholder="Email"
      //   repasswordPlaceholder="Email"
      usernameIconComponent={icon}
      usernameOnChangeText={(email) => setEmail(email)}
      passwordOnChangeText={(password) => setPassword(password)}
      //   repasswordOnChangeText={(email) => setEmail(email)}
      onPressLogin={async () => {
        console.log(email, password, "login");
        try {
          await loginWithEmail(email, password);
        } catch (error) {
          setLoginError(error.message);
        }
      }}
      onPressSignup={() => {
        console.log(username, password, email, "signup");
      }}
    />
  );
}
