import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Input from "../../components/Input";
import InputErrorMessage from "../../components/InputErrorMesssage";
import { dbh, registerWithEmail } from "../../utils/firebase";

export default function AdminSignUpScreen({ navigation }) {
  const [values, setValues] = useState({});
  const [registerError, setRegisterError] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#F4A261", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: hp("100%"),
        }}
      />
      <View style={styles.innerContain}>
        <Text style={styles.title}>Register New User</Text>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <SafeAreaView style={styles.fieldsContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ padding: 20 }}>
                <View style={styles.input}>
                  <Input
                    icon={require("../../assets/icons/person.png")}
                    placeholder="First Name"
                    keyboardType="default"
                    onChange={(firstName) => {
                      setValues({ ...values, name: firstName });
                    }}
                  />
                </View>
                <View style={styles.input}>
                  <Input
                    icon={require("../../assets/icons/email.png")}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChange={(email) => {
                      setValues({ ...values, email: email });
                    }}
                  />
                </View>
                <View style={styles.input}>
                  <Input
                    icon={require("../../assets/icons/lock.png")}
                    placeholder="Password"
                    password={true}
                    keyboardType="default"
                    onChange={(password) => {
                      setValues({ ...values, password: password });
                    }}
                  />
                </View>
                {/* <View style={styles.input}>
                  <Input
                    icon={require("../../assets/icons/lock.png")}
                    placeholder="Re-Password"
                    password={true}
                    keyboardType="default"
                    onChange={(repassword) => {
                      setValues({ ...values, repassword: repassword });
                    }}
                  />
                </View> */}
                <View style={styles.input}>
                  <Input
                    icon={require("../../assets/icons/lock.png")}
                    placeholder="Admin Passcode"
                    password={true}
                    keyboardType="number-pad"
                    maxLength={4}
                    onChange={(passcode) => {
                      setValues({ ...values, passcode: passcode });
                    }}
                  />
                </View>
                {<InputErrorMessage error={registerError} visible={true} />}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Go Back"
                    raised={true}
                    buttonStyle={styles.signup}
                    onPress={() => navigation.navigate("Login")}
                  />
                  <Button
                    title="Register"
                    raised={true}
                    buttonStyle={styles.login}
                    onPress={async () => {
                      const pinArray = values.passcode.split("");
                      try {
                        user = await registerWithEmail(
                          values.email,
                          values.password
                        ).then((userCredential) => {
                          dbh
                            .collection("Users")
                            .doc(userCredential.user.uid)
                            .set({
                              ...values,
                              pin: pinArray,
                              defaultPath:
                                "/users/36112759-7710-4c22-b63b-8433b507f02e/tasks",
                            });
                        });
                      } catch (error) {
                        setRegisterError(error.message);
                      }
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E76F51",
  },
  innerContain: {
    alignItems: "center",
    marginTop: 40,
  },
  fieldsContainer: {
    width: wp("90%"),
    height: hp("65%"),
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
  },
  input: {
    marginBottom: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 26,
    color: "#FFFFFF",
    letterSpacing: 0.34,
    lineHeight: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
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
