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
} from "native-base";
import React, { useEffect, useState } from "react";
import { Button as NativeButton, Image, StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { db } from "../../utils/firebase";

export default function AdminTaskEditScreen({ navigation, route }) {
  const [userId, settUserId] = useState("36112759-7710-4c22-b63b-8433b507f02e");
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Medium.ttf"),
  });
  const [name, setName] = useState("");
  const [taskName, setTaskName] = useState(route.params.taskname);
  const [category, setCategory] = useState(route.params.category);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [selectedTime, setSelectedTime] = useState(
    new Date(route.params.time * 1000)
  );
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [image, setImage] = useState(route.params.image);

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
    return () => db.ref(`/users/${userId}`).off("value", onValueChange);
  }, [userId]);

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

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.warn("A time has been picked: ", time);
    setSelectedTime(time);
    hideTimePicker();
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
        <Text style={styles.title}>Task Overview</Text>
        <Item style={styles.taskNameBox} floatingLabel>
          <Label style={{ color: "#737568", fontFamily: "Rubik" }}>
            Task Name
          </Label>
          <Input
            style={{ fontFamily: "Rubik" }}
            onChangeText={(text) => setTaskName(text)}
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
              // placeholderStyle={{ color: "#bfc6ea" }}
              //   placeholderIconColor="#007aff"
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
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
            {/* <TouchableOpacity
              // fontWeight="400"
              // fontFamily="Rubik"
              // title="Set time"
              // color="lightgrey"
              onPress={showTimePicker}
            >
              <Text style={{ color: "lightgrey" }}>Set time</Text>
            </TouchableOpacity> */}
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              headerTextIOS="Pick a time"
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideTimePicker}
            />
          </View>
        )}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate("QR")}>
        <Card style={styles.card1}>
          <CardItem cardBody>
            <Image
              source={require("../../assets/images/scanQR.png")}
              style={{ width: hp("23%"), aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>Scan</Text>
          </CardItem>
        </Card>
      </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Task")}>
          <Card style={styles.card2}>
            <CardItem cardBody>
              <Image
                source={require("../../assets/images/tasks.png")}
                style={{ width: hp("23%"), aspectRatio: 1 }}
              />
            </CardItem>
            <CardItem cardBody>
              <Text style={styles.buttonText}>Tasks</Text>
            </CardItem>
          </Card>
        </TouchableOpacity> */}
      </Container>
      <Footer style={styles.footerTab}>
        <FooterTab>
          <Button onPress={() => navigation.navigate("AdminTask")}>
            <Icon style={styles.footerTabIcon} name="apps" />
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("AdminInstructionEdit", {
                taskname: taskName,
              })
            }
          >
            <Icon style={styles.footerTabIcon} name="create" />
          </Button>
          <Button>
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
