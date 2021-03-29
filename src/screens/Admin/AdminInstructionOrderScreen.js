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
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  Button as NativeButton,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { db } from "../../utils/firebase";

export default function AdminInstructionOrderScreen({ navigation, route }) {
  const [userId, settUserId] = useState("36112759-7710-4c22-b63b-8433b507f02e");
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Medium.ttf"),
  });
  const [name, setName] = useState();
  const [taskName, setTaskName] = useState(route.params.taskname);
  const [instructionName, setInstructionName] = useState("");
  const [steps, setSteps] = useState([
    { id: 1, step: 1 },
    { id: 2, step: 2 },
    { id: 3, step: 3 },
    { id: 4, step: 4 },
    { id: 5, step: 5 },
    { id: 6, step: 6 },
  ]);
  const [step, setStep] = useState(
    Math.max(...steps.map((stepObj) => stepObj.step), 0) + 1
  );
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  //   const [selectedTime, setSelectedTime] = useState(
  //     new Date(route.params.time * 1000)
  //   );
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [recordingURI, setRecordingURI] = useState("./assets/Hello.mp3");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    const onValueChange = db
      .ref(`/users/${userId}/name`)
      .on("value", (snapshot) => {
        setName(snapshot.val());
      });
    // Stop listening for updates when no longer required
    sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
    return () => db.ref(`/users/${userId}`).off("value", onValueChange);
  }, [userId, sound]);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingURI(uri);
    console.log("Recording stopped and stored at", uri);
  }

  async function playSound() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: recordingURI,
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  if (!loaded) {
    return null;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
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
        <Text style={styles.title}>{taskName}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120 }}
            />
          )}
          <NativeButton
            title="+ Select Image"
            color="#2A9D8F"
            onPress={pickImage}
          />
        </View>
        <Item style={styles.taskNameBox} floatingLabel>
          <Label style={{ color: "#737568", fontFamily: "Rubik" }}>
            Instruction Name
          </Label>
          <Input
            style={{ fontFamily: "Rubik" }}
            onChangeText={(text) => setInstructionName(text)}
            value={instructionName}
          />
        </Item>
        {/* <View>
          <NativeButton
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
          />
        </View> */}
        {/* <View>
          <NativeButton title="Play Sound" onPress={playSound} />
        </View> */}
        <View style={styles.controls}>
          {recording ? (
            <TouchableOpacity style={styles.playpause} onPress={stopRecording}>
              <Image
                source={require("../../assets/icons/record_stop.png")}
                style={styles.record}
                fadeDuration={0}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.playpause} onPress={startRecording}>
              <Image
                source={require("../../assets/icons/record.png")}
                style={styles.record}
                fadeDuration={0}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.playpause}
            disabled={recording}
            onPress={playSound}
          >
            <Image
              source={require("../../assets/icons/record_play.png")}
              style={styles.play}
              fadeDuration={0}
            />
          </TouchableOpacity>
        </View>
        <Item picker style={styles.taskCategory}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#737568", fontFamily: "Rubik" }}>
              Category
            </Text>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" style={{ color: "#737568" }} />}
              style={{ width: undefined }}
              placeholder="Select category"
              placeholderStyle={{ color: "#737568", fontFamily: "Rubik" }}
              textStyle={{ fontFamily: "Rubik" }}
              itemTextStyle={{ fontFamily: "Rubik" }}
              // placeholderStyle={{ color: "#bfc6ea" }}
              //   placeholderIconColor="#007aff"
              selectedValue={step}
              onValueChange={(value) => setStep(value)}
            >
              {Array.from({ length: step }, (x, i) => (
                <Picker.Item label={"Step " + (i + 1)} value={i + 1} />
              ))}
              {/* <Picker.Item label="Morning" value="morning" />
              <Picker.Item label="Afternoon" value="afternoon" />
              <Picker.Item label="Evening" value="evening" />
              <Picker.Item label="Motivator" value="motivators" /> */}
            </Picker>
          </View>
        </Item>
      </Container>

      <Button
        style={styles.backButton}
        onPress={() => {
          let newSteps = [...steps];
          newSteps.filter((obj) => {
            if (obj.step >= step) {
              obj.step = obj.step + 1;
            }
          });
          const newId =
            Math.max(...newSteps.map((stepObj) => stepObj.id), 0) + 1;
          newSteps.push({ id: newId, step: step });
          setSteps(newSteps);
          console.log(newSteps);
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
        <Text style={styles.buttonText}>Back to Steps</Text>
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
  record: {
    width: wp("25%"),
    height: wp("25%"),
  },
  play: {
    width: wp("25%"),
    height: wp("25%"),
  },
});
