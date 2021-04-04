import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Container,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Text,
  Card,
  CardItem,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  Button as NativeButton,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { db } from "../../utils/firebase";

export default function AdminInstructionOrderScreen({ navigation, route }) {
  const [taskname] = useState(route.params.taskname);
  const [instructions, setInstructions] = useState(
    route.params.instructions.map((e) => {
      return { ...e, mute: false };
    })
  );

  return (
    <>
      <Container style={styles.container}>
        <LinearGradient
          colors={["#e9aa73", "#e6ca84"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: hp("100%"),
          }}
        />
        <SafeAreaView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>{taskname}</Text>
            <TouchableOpacity
              onPress={() => {
                //             var newCityRef = dbh.collection("cities").doc();
                navigation.navigate("AdminInstructionEdit", {
                  taskname: taskname,
                  instruction: "",
                  image: null,
                  audio: null,
                });
              }}
              style={{ marginTop: 20 }}
            >
              <Image
                source={require("../../assets/icons/add.png")}
                style={{
                  width: wp("20%"),
                  height: wp("10%"),
                  aspectRatio: 1,
                }}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginBottom: 100 }}>
            {instructions.map((step, i) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      let newMute = { ...step, mute: !step.mute };
                      let newInstructions = [...instructions];
                      newInstructions[i] = newMute;
                      setInstructions(newInstructions);
                    }}
                    style={{ marginTop: 20 }}
                  >
                    <Image
                      source={
                        step.mute
                          ? require("../../assets/icons/mute.png")
                          : require("../../assets/icons/unmute.png")
                      }
                      style={{
                        width: wp("20%"),
                        height: wp("10%"),
                        aspectRatio: 1,
                      }}
                      fadeDuration={0}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AdminInstructionEdit", {
                        taskname: taskname,
                        instruction: step.text,
                        image: step.image,
                        audio: step.audio,
                      })
                    }
                  >
                    <Card style={styles.card}>
                      <CardItem cardBody>
                        <Text>{step.text}</Text>
                      </CardItem>
                      {/* <CardItem cardBody>
                  <Text style={styles.buttonText}>Scan</Text>
                </CardItem> */}
                    </Card>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Container>
      <Button
        style={styles.backButton}
        onPress={() => {
          navigation.navigate("AdminTaskEdit");
        }}
      >
        <Image
          source={require("../../assets/icons/back.png")}
          fadeDuration={0}
          style={{
            width: wp("10%"),
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        />
        <Text style={styles.buttonText}>Back to Task</Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: wp("100%"),
    height: hp("12%"),
    backgroundColor: "#2A9D8F",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: hp("4%"),
  },
  controls: {
    flexDirection: "row",
    width: wp("100%"),
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    backgroundColor: "#E76F51",
    alignItems: "center",
    // justifyContent: "center",
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
    fontSize: hp("4%"),
    color: "#fff",
    marginBottom: 30,
    fontFamily: "Rubik",
    marginTop: 20,
  },
  buttonText: {
    fontSize: hp("4%"),
    fontFamily: "Rubik",
  },
  footerTab: {
    // backgroundColor: "#4f9b8f",
    backgroundColor: "#2A9D8F",
  },
  footerTabIcon: {
    color: "white",
    fontSize: 35,
  },
  taskNameBox: {
    width: wp("80%"),
    marginBottom: 25,
  },
  taskCategory: {
    marginTop: 20,
    width: wp("80%"),
  },
  checkbox: {
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  timeField: {
    marginLeft: 70,
    marginBottom: 20,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  record: {
    width: wp("25%"),
    height: wp("25%"),
  },
  play: {
    width: wp("25%"),
    height: wp("25%"),
  },
  card: {
    height: hp("8%"),
    width: wp("80%"),
    paddingLeft: 15,
    justifyContent: "center",

    // alignItems: "center",
    borderRadius: 20,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // shadowOffset: { width: -5, height: 5 },
  },
});
