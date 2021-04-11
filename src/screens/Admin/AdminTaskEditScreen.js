import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Text,
  Toast,
} from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { Button as NativeButton, Image, StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { storage, dbh } from "../../utils/firebase";
import { AuthUserContext } from "../../navigations/AuthUserProvider";
// import * as admin from "firebase-admin";

export default function AdminTaskEditScreen({ navigation, route }) {
  const { user } = useContext(AuthUserContext);
  const [uid] = useState(user.uid);
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Medium.ttf"),
  });
  const [taskId, setTaskId] = useState(route.params.id);
  // console.log(id);
  const [taskName, setTaskName] = useState(route.params.taskname);
  const [category, setCategory] = useState(route.params.category);
  const [instructions, setInstructions] = useState(route.params.instructions);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [selectedTime, setSelectedTime] = useState(
    route.params.time === "" ? new Date() : route.params.time.toDate()
  );
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [image, setImage] = useState(route.params.image);
  const [savedState, setSavedState] = useState(true);

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
  }, []);

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
      setSavedState(false);
    }
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.warn("A time has been picked: ", time);
    setSelectedTime(time);
    setSavedState(false);
    hideTimePicker();
  };

  const uploadImage = async (uri) => {
    if (uri.includes("firebase")) {
      return uri;
    } else {
      const uriParts = uri.split("/");
      const fileName = uriParts[uriParts.length - 1];
      console.log(uriParts);
      console.log(fileName);
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = storage.ref().child(taskId + "/" + fileName);
      return ref.put(blob).then(() => {
        return ref.getDownloadURL().then((url) => {
          return url;
        });
      });
    }
  };

  const addTask = (taskname, taskcategory, toggle, time, img) => {
    if (taskname !== "" && taskcategory !== "" && img !== null) {
      uploadImage(img).then((url) => {
        if (toggle) {
          dbh
            .collection("Tasks")
            .doc(taskId)
            .update({
              name: taskname,
              category: taskcategory,
              disabled: false,
              time: time,
              image: url,
              disabled: false,
              id: taskId,
              instructions: [],
            })
            .then(() => {
              let tasks = [];
              dbh
                .collection("Users")
                .doc(`${uid}`)
                .get()
                .then((query) => {
                  tasks = [...query.data().tasks];
                  if (!tasks.includes(taskId)) {
                    tasks.push(taskId);
                  }
                  console.log(tasks);
                })
                .then(() => {
                  dbh.collection("Users").doc(`${uid}`).update({
                    tasks: tasks,
                  });
                });
            })
            .then(() => {
              Toast.show({
                text: "Saved Successfully!",
                // buttonText: "Okay",
                type: "success",
                duration: 4000,
              });
              setSavedState(true);
              setImage(url);
              console.log("Task added/updated successfully!");
            });
        } else {
          dbh
            .collection("Tasks")
            .doc(taskId)
            .update({
              name: taskname,
              category: taskcategory,
              disabled: false,
              time: "",
              image: url,
              disabled: false,
              id: taskId,
              instructions: [],
            })
            .then(() => {
              let tasks = [];
              dbh
                .collection("Users")
                .doc(`${uid}`)
                .get()
                .then((query) => {
                  tasks = [...query.data().tasks];
                  if (!tasks.includes(taskId)) {
                    tasks.push(taskId);
                  }
                  console.log(tasks);
                })
                .then(() => {
                  dbh.collection("Users").doc(`${uid}`).update({
                    tasks: tasks,
                  });
                });
            })
            .then(() => {
              Toast.show({
                text: "Saved Successfully!",
                // buttonText: "Okay",
                type: "success",
                duration: 4000,
              });
            });
          setImage(url);
          setSavedState(true);
          console.log("Task added/updated successfully!");
        }
      });
    } else {
      Toast.show({
        text: "Please add task details",
        // buttonText: "Okay",
        type: "danger",
        duration: 4000,
      });
    }
  };

  const deleteTask = () => {
    var ref = storage.ref().child(taskId);
    ref.listAll().then((listResults) => {
      Promise.all(
        listResults.items.map((item) => {
          return item.delete();
        })
      ).then(() => {
        var audioRef = storage.ref().child(taskId + "/Audio");
        audioRef.listAll().then((listResults) => {
          Promise.all(
            listResults.items.map((item) => {
              return item.delete();
            })
          ).then(() => {
            dbh
              .collection("Tasks")
              .doc(taskId)
              .delete()
              .then(() => {
                Toast.show({
                  text: "Task deleted successfully!",
                  type: "warning",
                  duration: 3000,
                });
                console.log("Task deleted successfully!");
                navigation.navigate("AdminTask");
              });
          });
        });
      });
    });
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
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <Button
            iconLeft
            rounded
            style={{
              marginRight: 30,
              marginTop: 60,
              backgroundColor: "#2A9D8F",
            }}
            onPress={() =>
              addTask(taskName, category, toggleCheckBox, selectedTime, image)
            }
          >
            <Icon name="save" />
            <Text>Save</Text>
          </Button>
        </View>
        <Text style={styles.title}>Task Overview</Text>
        <Item style={styles.taskNameBox} floatingLabel>
          <Label style={{ color: "#737568", fontFamily: "Rubik" }}>
            Task Name
          </Label>
          <Input
            style={{ fontFamily: "Rubik" }}
            onChangeText={(text) => {
              setTaskName(text);
              setSavedState(false);
            }}
            value={taskName}
          />
        </Item>
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
              selectedValue={category}
              onValueChange={(value) => {
                setCategory(value);
                setSavedState(false);
              }}
            >
              <Picker.Item label="Morning" value="morning" />
              <Picker.Item label="Afternoon" value="afternoon" />
              <Picker.Item label="Evening" value="evening" />
              <Picker.Item label="Motivator" value="motivators" />
            </Picker>
          </View>
        </Item>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            isChecked={toggleCheckBox}
            // fillColor="#4f9b8f"
            fillColor="#2A9D8F"
            disableText
            onPress={(checked) => setToggleCheckBox(checked)}
          />
          <Text style={{ fontFamily: "Rubik", fontSize: hp("2.2%") }}>
            Time
          </Text>
        </View>
        {toggleCheckBox && (
          <View style={styles.timeField}>
            <Text style={{ fontFamily: "Rubik", fontSize: hp("2.2%") }}>
              {selectedTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
            <NativeButton
              title="Set time"
              color="#737568"
              onPress={showTimePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              date={selectedTime}
              headerTextIOS="Pick a time"
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideTimePicker}
            />
          </View>
        )}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: -70,
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <NativeButton
            title="+ Select Icon"
            color="#2A9D8F"
            onPress={pickImage}
          />
        </View>
      </Container>
      <Footer style={styles.footerTab}>
        <FooterTab>
          <Button
            onPress={() => {
              if (
                taskName === "" ||
                category === "" ||
                image === null ||
                !savedState
              ) {
                deleteTask();
              } else {
                navigation.navigate("AdminTask");
              }
            }}
          >
            <Icon style={styles.footerTabIcon} name="undo" />
          </Button>
          <Button
            onPress={() => {
              if (
                taskName !== "" &&
                category !== "" &&
                image !== null &&
                savedState
              ) {
                navigation.navigate("AdminInstructionOrder", {
                  taskId: taskId,
                  taskname: taskName,
                  instructions: route.params.instructions,
                });
              } else {
                Toast.show({
                  text: "Please add task details and save",
                  // buttonText: "Okay",
                  type: "danger",
                  duration: 3000,
                });
              }
            }}
          >
            <Icon style={styles.footerTabIcon} name="list" />
          </Button>
          <Button
            onPress={() => {
              deleteTask();
            }}
          >
            <Icon style={styles.footerTabIcon} name="trash" />
          </Button>
        </FooterTab>
      </Footer>
    </>
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
});
