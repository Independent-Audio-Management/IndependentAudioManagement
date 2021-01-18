import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Container, Card, CardItem, Text } from "native-base";
import { Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    Rubik: require("../assets/fonts/Rubik-Medium.ttf"),
  });

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
      <Text style={styles.title}>Hello Gabe!</Text>
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
