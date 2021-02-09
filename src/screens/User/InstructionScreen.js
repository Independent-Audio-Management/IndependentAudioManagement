import { Entypo, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
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
import ProgressCircle from "react-native-progress-circle";
import ProgressBar from "react-native-progress/Bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function InstructionScreen({ navigation, route }) {
  let [steps, setSteps] = useState(route.params.instructions);
  let [playbackInstance, setPlaybackInstance] = useState(new Audio.Sound());
  let [currentIndex, setCurrentIndex] = useState(0);
  let [volume, setVolume] = useState(1.0);
  let [isBuffering, setIsBuffering] = useState(true);
  let [isPlaying, setIsPlaying] = useState(true);
  let [timeout, setTime] = useState();
  let [timeLeft, setTimeLeft] = useState(
    steps.length > 0 ? steps[currentIndex].duration : 0
  );

  useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });
    loadAudio();
    setTimeLeft(steps[currentIndex].duration);
  }, [currentIndex]);

  const loadAudio = async (newPlaybackInstance, source) => {
    try {
      const newPlaybackInstance = new Audio.Sound();
      const source = {
        uri: steps[currentIndex].audio,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      newPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await newPlaybackInstance.loadAsync(source, status, false);
      setPlaybackInstance(newPlaybackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!timeLeft) {
      if (!currentIndex <= steps.length - 2) return;
      setCurrentIndex(currentIndex + 1);
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - (isPlaying ? 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, isPlaying]);

  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(isBuffering);
    if (status.didJustFinish) {
      // if (currentIndex <= steps.length - 2) {
      //   setTimeout(() => {
      //     setCurrentIndex(currentIndex + 1);
      //   }, steps[currentIndex].duration * 1000);
      // }
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await playbackInstance.pauseAsync();
      timeout ? timeout.pause() : null;
    } else {
      await playbackInstance.playAsync();
      timeout ? timeout.start() : null;
    }
    setIsPlaying(!isPlaying);
  };

  const handlePreviousTrack = async () => {
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < steps.length - 1
        ? (currentIndex -= 1)
        : (currentIndex = 0);
      setCurrentIndex(currentIndex);
    }
  };

  const handleNextTrack = async () => {
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < steps.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      setCurrentIndex(currentIndex);
    }
  };

  const handleReplay = async () => {
    if (!isPlaying) {
      setIsPlaying(!isPlaying);
      await playbackInstance.replayAsync();
    }
    setTimeLeft(steps[currentIndex].duration);
    await playbackInstance.replayAsync();
  };

  const renderFileInfo = steps ? (
    <Card style={styles.highlight}>
      <CardItem cardBody>
        {steps[currentIndex] != undefined && (
          <Image
            source={{ uri: steps[currentIndex].image }}
            style={{
              width: wp("50%"),
              aspectRatio: 1,
            }}
          />
        )}
      </CardItem>
      <CardItem cardBody>
        {steps[currentIndex] != undefined && (
          <Text style={styles.cardText}>{steps[currentIndex].text}</Text>
        )}
      </CardItem>
    </Card>
  ) : null;

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
      <Text style={styles.title}>{route.params.title}</Text>

      {steps.length > 0 ? (
        <>
          {/* <ProgressBar
            marginTop={10}
            marginLeft={14}
            progress={currentIndex / (steps.length - 1)}
            width={wp("90%")}
            color="#2A9D8F"
            backgroundColor={"#fff"}
            borderWidth={0}
            height={hp("1%")}
          />
          <Text style={styles.progressPercentage}>
            {Math.round((currentIndex / (steps.length - 1)) * 100)}% Done
          </Text> */}
          {renderFileInfo}
          <View style={styles.controls}>
            <TouchableOpacity onPress={handleReplay}>
              <Card style={styles.replayAudioCard}>
                <CardItem cardBody>
                  <Text style={styles.replayAudio}>
                    <Entypo name="cw" size={30} color="black" /> Replay Audio
                  </Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={currentIndex === 0 ? styles.disabled : styles.control}
              onPress={handlePreviousTrack}
              disabled={currentIndex === 0}
            >
              <Ionicons
                name="ios-skip-backward"
                size={wp("20%")}
                color="#444"
              />
            </TouchableOpacity>
            {currentIndex == steps.length - 1 ? (
              <TouchableOpacity
                onPress={() => {
                  playbackInstance.stopAsync();
                  navigation.navigate("CongratsScreen");
                }}
              >
                <Card
                  style={{ ...styles.circleCard, backgroundColor: "green" }}
                >
                  <Entypo name="check" size={wp("10%")} color="white" />
                  <Text style={{ ...styles.stepText, color: "#fff" }}>
                    Task Done
                  </Text>
                </Card>
              </TouchableOpacity>
            ) : (
              <ProgressCircle
                percent={(currentIndex / (steps.length - 1)) * 100}
                radius={50}
                borderWidth={8}
                color="#2A9D8F"
                shadowColor="#999"
                bgColor="#fff"
              >
                {/* <Text style={{ fontSize: 18 }}>{`${
                (currentIndex / (steps.length - 1)) * 100
              }%`}</Text> */}
                <TouchableOpacity
                  style={styles.playpause}
                  onPress={handlePlayPause}
                >
                  {isPlaying ? (
                    <Ionicons name="ios-pause" size={wp("15%")} color="#444" />
                  ) : (
                    <Ionicons name="ios-play" size={wp("15%")} color="#444" />
                  )}
                </TouchableOpacity>
              </ProgressCircle>
            )}
            {/* {currentIndex == steps.length - 1 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    playbackInstance.stopAsync();
                    navigation.navigate("CongratsScreen");
                  }}
                >
                  <Card
                    style={{ ...styles.circleCard, backgroundColor: "green" }}
                  >
                    <Entypo name="check" size={wp("10%")} color="white" />
                    <Text style={{ ...styles.stepText, color: "#fff" }}>
                      Task Done
                    </Text>
                  </Card>
                </TouchableOpacity>
              </>
            ) : ( */}
            <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
              <Ionicons name="ios-skip-forward" size={wp("20%")} color="#444" />
            </TouchableOpacity>
            {/* )} */}
          </View>
          <ProgressBar
            marginTop={5}
            marginLeft={14}
            progress={
              (steps[currentIndex].duration - timeLeft) /
              steps[currentIndex].duration
            }
            width={wp("90%")}
            color="#444"
            backgroundColor={"#fff"}
            borderWidth={0}
            height={hp("1%")}
          />
          {/* <Text>{timeLeft}</Text> */}
        </>
      ) : (
        <></>
      )}

      <Button
        style={styles.backButton}
        onPress={() => {
          playbackInstance.stopAsync();
          playbackInstance.unloadAsync();
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
    alignItems: "center",
    // justifyContent: "center",
  },
  highlight: {
    flex: 0.75,
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
    textAlign: "center",
    fontSize: hp("3%"),
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
    height: hp("11%"),
    width: wp("25%"),
    marginLeft: 22,
    marginTop: 8,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  stepText: {
    fontSize: hp("2%"),
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  controls: {
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
  playpause: {
    margin: 0,
    marginRight: 0,
  },
  disabled: {
    margin: 20,
    color: "red",
  },
  albumCover: {
    width: wp("75%"),
    height: hp("25%"),
  },
});
