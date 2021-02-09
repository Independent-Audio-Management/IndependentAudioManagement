import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "native-base";
import React from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function CongratsScreen({ navigation }) {
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  if (!loaded) return null;

  // play audio
  let soundObject = new Audio.Sound();
  let audioPromise = new Promise((resolve, reject) => {
    soundObject.loadAsync(require("../../assets/sounds/Congrats.m4a"), {
      shouldPlay: true,
    });
  }).then(() => {
    soundObject.unloadAsync();
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#F4A261", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: hp("100%"),
        }}
      />
      <Text
        style={{
          fontSize: hp("5%"),
          color: "#fff",
          marginTop: hp("10%"),
          fontFamily: "Rubik",
        }}
      >
        Congratulations!
      </Text>
      <Text
        style={{
          fontSize: hp("3%"),
          color: "#fff",
          marginTop: hp("2%"),
          fontFamily: "Rubik",
        }}
      >
        You completed the task!
      </Text>

      <Image
        source={require("../../assets/images/youdidit.gif")}
        style={{
          height: undefined,
          width: wp("100%"),
          aspectRatio: 1,
          marginTop: hp("5%"),
        }}
      />

      <Button
        style={styles.backButton}
        onPress={() => {
          soundObject.stopAsync();
          navigation.navigate("Task");
        }}
      >
        <Image
          source={require("../../assets/icons/back.png")}
          fadeDuration={0}
          style={{
            width: wp("10%"),
            aspectRatio: 1,
            resizeMode: "contain",
            marginRight: 10,
          }}
        />
        <Text style={styles.buttonText}>Back to TASKS</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: hp("4%"),
  },
  backButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: wp("100%"),
    height: hp("12%"),
    backgroundColor: "#2A9D8F",
    justifyContent: "center",
  },
});
