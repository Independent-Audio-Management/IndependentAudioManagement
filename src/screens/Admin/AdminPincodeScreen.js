import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthUserContext } from "../../navigations/AuthUserProvider";
import { dbh, logout } from "../../utils/firebase";

export default function AdminPincodeScreen({ navigation }) {
  const { user } = useContext(AuthUserContext);
  const [correctPass, setCorrectPass] = useState(null);
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [keypad] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);

  useEffect(() => {
    dbh
      .collection("Users")
      .doc(`${user.uid}`)
      .get()
      .then((querySnapshot) => {
        setCorrectPass(querySnapshot.data().pin);
      });
  }, []);

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
      <View style={styles.swipe}>
        <View style={{ marginTop: 10 }}>
          <View>
            <Text style={styles.passcodeText}>Enter Passcode</Text>
          </View>
          <View style={styles.codeContainer}>
            {passcode.map((p, i) => {
              return (
                <View
                  key={"pin" + i}
                  style={p != "" ? styles.codeFilled : styles.code}
                ></View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.numbersContainer}>
          {keypad.map((keyNum) => {
            return (
              <TouchableOpacity
                style={styles.number}
                key={"keypad" + keyNum}
                onPress={() => {
                  const index = passcode.findIndex((elem) => elem === "");
                  let clone = [...passcode];
                  if (index !== -1) {
                    clone[index] = keyNum;
                    setPasscode(clone);
                  }
                  if (index === 3) {
                    if (JSON.stringify(clone) === JSON.stringify(correctPass)) {
                      navigation.navigate("AdminTask");
                    } else {
                      setPasscode(["", "", "", ""]);
                    }
                  }
                }}
              >
                <Text style={styles.numberText}>{keyNum}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            setPasscode(["", "", "", ""]);
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let clone = [...passcode];
            for (let i = clone.length - 1; i >= 0; i--) {
              if (clone[i] !== "") {
                clone[i] = "";
                break;
              }
            }
            setPasscode(clone);
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E76F51",
  },
  swipe: {
    height: 173,
    alignItems: "center",
    justifyContent: "center",
  },
  passcodeText: {
    fontSize: 22,
    color: "#FFFFFF",
    letterSpacing: 0.34,
    lineHeight: 25,
  },
  codeContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  code: {
    width: 13,
    height: 13,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  codeFilled: {
    width: 13,
    height: 13,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  number: {
    width: 75,
    height: 75,
    borderRadius: 75,
    margin: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 282,
    height: 348,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 36,
    color: "#FFFFFF",
    letterSpacing: 0,
    textAlign: "center",
  },
  buttons: {
    marginTop: 73,
    marginLeft: 46,
    marginRight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    letterSpacing: -0.39,
    textAlign: "center",
  },
  logout: {
    marginTop: 73,
    marginLeft: 46,
    marginRight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    width: 100,
    height: 50,
    borderRadius: 5,
    // backgroundColor: "rgba(255,255,255,0.1)",
    // borderColor: "grey",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
