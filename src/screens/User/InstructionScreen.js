import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, CardItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function InstructionScreen({ navigation, route }) {
  let [steps, setSteps] = useState([]);
  const [sound, setSound] = useState();
  const [currentStepNum, setCurrentStepNum] = useState(0);

  // if (!loaded) return null;

  useEffect(async () => {
    if (!!route.params.instructions) {
      const loadedAudio = route.params.instructions.map(async (e) => {
        console.log(e);
        const { sound } = await Audio.Sound.createAsync(
          { uri: e.audio }
          // { shouldPlay: true }
        );
        return { ...e, audio: sound };
      });
      setSteps(loadedAudio);
    }
  }, [route]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // play audio
  // let sound = new Audio.Sound;
  // let audioPromise = new Promise((resolve, reject) => {
  //   sound.loadAsync({ uri: steps[currentStepNum].audio }, { shouldPlay: true });
  //   sound.setOnPlaybackStatusUpdate((status) => {
  //     if (status.didJustFinish) {
  //       if (currentStepNum <= steps.length - 2) {
  //         setTimeout(() => {
  //           setCurrentStepNum((s) => s + 1);
  //         }, 3000);
  //       }
  //     }
  //   });
  // })
  //   .then(() => {
  //     sound.unloadAsync();
  //   })
  //   .catch(console.log);

  //Tas Version of Playing Audio
  const playSound = async () => {
    // console.log("Loading Sound");
    // const { sound } = await Audio.Sound.createAsync(
    //   { uri: steps[currentStepNum].audio },
    //   { shouldPlay: true }
    // );
    // setSound(sound);

    console.log("Playing Sound");
    await steps[currentStepNum].audio.playAsync();
  };

  const stopSound = async () => {
    console.log("Stopping Sound");
    await sound.stopAsync();
  };

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
      <Text style={styles.title}>{route.params.title}</Text>

      {steps.length > 0 ? (
        <>
          <ProgressBar
            marginTop={10}
            marginLeft={14}
            progress={currentStepNum / (steps.length - 1)}
            width={wp("90%")}
            color="#2A9D8F"
            backgroundColor={"#fff"}
            borderWidth={0}
            height={hp("1%")}
          />
          <Text style={styles.progressPercentage}>
            {Math.round((currentStepNum / (steps.length - 1)) * 100)}% Done
          </Text>

          <Card style={styles.highlight}>
            <CardItem cardBody>
              {steps[currentStepNum] != undefined && (
                <Image
                  source={{ uri: steps[currentStepNum].image }}
                  style={{
                    width: wp("45%"),
                    aspectRatio: 1,
                  }}
                />
              )}
            </CardItem>
            <CardItem cardBody>
              {steps[currentStepNum] != undefined && (
                <Text style={styles.cardText}>
                  {steps[currentStepNum].text}
                </Text>
              )}
            </CardItem>
          </Card>

          <TouchableOpacity onPress={playSound}>
            <Card style={styles.replayAudioCard}>
              <CardItem cardBody>
                <Text style={styles.replayAudio}>
                  <Entypo name="cw" size={30} color="black" /> Replay Audio
                </Text>
              </CardItem>
            </Card>
          </TouchableOpacity>

          <View style={{ flex: 1, flexDirection: "row" }}>
            {currentStepNum == 0 ? (
              <>
                <Card style={{ ...styles.circleCard, backgroundColor: "gray" }}>
                  <Entypo name="arrow-bold-left" size={50} color="black" />
                  <Text style={styles.stepText}>Previous step</Text>
                </Card>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  // previous step button pressed
                  if (currentStepNum >= 1) {
                    setCurrentStepNum(currentStepNum - 1);
                    stopSound;
                  }
                }}
              >
                <Card style={styles.circleCard}>
                  <Entypo name="arrow-bold-left" size={50} color="black" />
                  <Text style={styles.stepText}>Previous step</Text>
                </Card>
              </TouchableOpacity>
            )}

            {currentStepNum == steps.length - 1 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    stopSound;
                    navigation.navigate("CongratsScreen");
                  }}
                >
                  <Card
                    style={{ ...styles.circleCard, backgroundColor: "green" }}
                  >
                    <Entypo name="check" size={75} color="white" />
                    <Text style={{ ...styles.stepText, color: "#fff" }}>
                      Task done
                    </Text>
                  </Card>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (currentStepNum < steps.length - 1) {
                    setCurrentStepNum(currentStepNum + 1);
                    stopSound;
                  }
                }}
              >
                <Card style={styles.circleCard}>
                  <Entypo name="arrow-bold-right" size={50} color="black" />
                  <Text style={styles.stepText}>Next step</Text>
                </Card>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <></>
      )}

      <Button
        style={styles.backButton}
        onPress={() => {
          stopSound;
          navigation.navigate("Task");
        }}
      >
        <Text style={styles.buttonText}>
          <Entypo name="reply" size={30} color="white" /> Back to TASKS
        </Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    height: hp("25%"),
    width: wp("90%"),
    marginLeft: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  title: {
    // fontWeight:"bold",
    fontSize: hp("4%"),
    color: "#fff",
    marginLeft: 20,
    marginTop: 30,
    fontFamily: "Rubik",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: hp("3%"),
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
  progressPercentage: {
    fontSize: hp("2%"),
    color: "#000",
    marginLeft: wp("4%"),
  },
  cardText: {
    fontSize: hp("2%"),
  },
  replayAudio: {
    fontSize: hp("3%"),
    fontWeight: "bold",
  },
  replayAudioCard: {
    height: hp("9%"),
    width: wp("90%"),
    marginLeft: 20,
    marginTop: 10,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  circleCard: {
    height: hp("18%"),
    width: wp("42%"),
    marginLeft: 22,
    marginTop: 8,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  stepText: {
    fontSize: hp("2%"),
  },
});
