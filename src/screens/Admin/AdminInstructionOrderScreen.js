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
  Footer,
  FooterTab,
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
  const [selected, setSelected] = useState(null);
  const [instructions, setInstructions] = useState(
    route.params.instructions.map((e) => {
      return { ...e, mute: false };
    })
  );

  const moveItem = (from, to) => {
    const instructionsCopy = [...instructions];
    // remove `from` item and store it
    var shifted = instructionsCopy.splice(from, 1)[0];
    // insert stored item into position `to`
    instructionsCopy.splice(to, 0, shifted);
    setInstructions(instructionsCopy);
  };

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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp("90%"),
              marginTop: 20,
            }}
          >
            <Text style={styles.title}>{taskname}</Text>
            <Button
              iconLeft
              rounded
              style={{
                marginRight: 10,
                backgroundColor: "#2A9D8F",
              }}
              // onPress={() => {
              //   navigation.navigate("AdminInstructionEdit", {
              //     taskname: taskname,
              //     instruction: "",
              //     image: null,
              //     audio: null,
              //   });
              // }}
            >
              <Icon name="save" />
              <Text>Save</Text>
            </Button>
          </View>
          <ScrollView>
            {instructions.map((step, i) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    {selected == step.text && i != 0 && (
                      <Button
                        success
                        transparent
                        onPress={() => moveItem(i, i - 1)}
                      >
                        <Icon name="arrow-up" />
                      </Button>
                    )}
                  </View>
                  <View
                    style={{ flexDirection: "row" }}
                    key={"instruction" + i}
                  >
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
                      onPress={() => {
                        //TODO: Change to step.id
                        if (step.text != selected) {
                          setSelected(step.text);
                        } else {
                          navigation.navigate("AdminInstructionEdit", {
                            taskname: taskname,
                            instruction: step.text,
                            image: step.image,
                            audio: step.audio,
                          });
                        }
                      }}
                    >
                      <Card
                        style={
                          selected == step.text
                            ? styles.cardSelected
                            : styles.card
                        }
                      >
                        <CardItem
                          cardBody
                          style={
                            selected == step.text
                              ? { backgroundColor: "#3ebdae" }
                              : { backgroundColor: "white" }
                          }
                        >
                          <Text
                            style={
                              selected == step.text
                                ? { fontWeight: "bold", color: "white" }
                                : null
                            }
                          >
                            {step.text}
                          </Text>
                        </CardItem>
                      </Card>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {selected == step.text && i != instructions.length - 1 && (
                      <Button
                        success
                        transparent
                        onPress={() => moveItem(i, i + 1)}
                      >
                        <Icon name="arrow-down" />
                      </Button>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Container>
      <Footer style={styles.footerTab}>
        <FooterTab>
          <Button onPress={() => navigation.navigate("AdminTaskEdit")}>
            <Icon style={styles.footerTabIcon} name="undo" />
          </Button>
          <Button
            onPress={() => {
              setSelected(null);
              setInstructions(route.params.instructions);
            }}
          >
            <Icon style={styles.footerTabIcon} name="refresh" />
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("AdminInstructionEdit", {
                taskname: taskname,
                instruction: "",
                image: null,
                audio: null,
              });
            }}
          >
            <Icon style={styles.footerTabIcon} name="create" />
          </Button>
        </FooterTab>
      </Footer>
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
  title: {
    fontSize: hp("4%"),
    color: "#fff",
    marginBottom: 30,
    fontFamily: "Rubik",
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
  cardSelected: {
    height: hp("8%"),
    width: wp("80%"),
    paddingLeft: 15,
    justifyContent: "center",
    backgroundColor: "#3ebdae",
    // alignItems: "center",
    borderRadius: 20,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // shadowOffset: { width: -5, height: 5 },
  },
  footerTab: {
    // backgroundColor: "#4f9b8f",
    backgroundColor: "#2A9D8F",
  },
  footerTabIcon: {
    color: "white",
    fontSize: 35,
  },
});
