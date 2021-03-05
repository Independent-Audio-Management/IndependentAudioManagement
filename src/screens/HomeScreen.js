import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Card, CardItem, Container, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { db } from "../utils/firebase";

export default function HomeScreen({ navigation }) {
  const [userId, settUserId] = useState("36112759-7710-4c22-b63b-8433b507f02e");
  const [loaded] = useFonts({
    Rubik: require("../assets/fonts/Rubik-Medium.ttf"),
  });
  const [name, setName] = useState("");

  useEffect(() => {
    const onValueChange = db
      .ref(`/users/${userId}/name`)
      .on("value", (snapshot) => {
        setName(snapshot.val());
      });
    // Stop listening for updates when no longer required
    return () => db.ref(`/users/${userId}`).off("value", onValueChange);
  }, [userId]);

  if (!loaded) {
    return null;
  }

  return (
    <Container style={styles.container}>
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
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminTask");
          }}
          style={{ marginRight: 30 }}
        >
          <Image
            source={require("../assets/icons/setting.png")}
            style={{
              width: wp("20%"),
              height: wp("10%"),
              aspectRatio: 1,
            }}
            fadeDuration={0}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Hello There!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("QR")}>
        <Card style={styles.card1}>
          <CardItem cardBody>
            <Image
              source={require("../assets/images/scanQR.png")}
              style={{ width: hp("23%"), aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>Scan</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Task")}>
        <Card style={styles.card2}>
          <CardItem cardBody>
            <Image
              source={require("../assets/images/tasks.png")}
              style={{ width: hp("23%"), aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>Tasks</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E76F51",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  card1: {
    height: hp("33%"),
    width: wp("75%"),
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: -15, height: 15 },
  },
  card2: {
    height: hp("33%"),
    width: wp("75%"),
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    marginTop: 30,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: -15, height: 15 },
  },
  title: {
    fontSize: hp("6%"),
    color: "#fff",
    marginBottom: 30,
    fontFamily: "Rubik",
  },
  buttonText: {
    fontSize: hp("4%"),
    fontFamily: "Rubik",
  },
});
