import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Input from "../../components/Input";
import InputErrorMessage from "../../components/InputErrorMesssage";
import { loginWithEmail } from "../../utils/firebase";

export default function AdminLoginScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../../assets/images/loginSplash.png")}
        style={styles.imageContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={styles.fieldsContainer}>
            <View style={styles.input}>
              <Input
                icon={require("../../assets/icons/email.png")}
                placeholder="Email Address"
                onChange={(email) => {
                  setEmail(email);
                }}
              />
            </View>
            <View style={styles.input}>
              <Input
                icon={require("../../assets/icons/lock.png")}
                placeholder="Password"
                password={true}
                onChange={(password) => {
                  setPassword(password);
                }}
              />
            </View>
            {<InputErrorMessage error={loginError} visible={true} />}
            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                raised={true}
                buttonStyle={styles.signup}
                onPress={() => navigation.navigate("Signup")}
              />
              <Button
                title="Login"
                raised={true}
                buttonStyle={styles.login}
                onPress={async () => {
                  try {
                    await loginWithEmail(email, password);
                  } catch (error) {
                    setLoginError(
                      "Incorrect Email/Password. Please try again!"
                    );
                  }
                }}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: wp("100%"),
    height: hp("100%"),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fieldsContainer: {
    width: wp("90%"),
    height: hp("30%"),
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginBottom: 50,
    // borderColor: "grey",
    // borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("70%"),
  },
  login: {
    backgroundColor: "#ff9430",
    fontWeight: "bold",
    width: wp("25%"),
  },
  signup: {
    backgroundColor: "#94928f",
    fontWeight: "bold",
    width: wp("25%"),
  },
});
