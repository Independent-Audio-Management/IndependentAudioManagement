import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { LinearGradient } from "expo-linear-gradient";
import { Card, CardItem, Button } from "native-base";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function QRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    // const task = JSON.parse(data);
    let image = require("../../assets/images/tasks.png");

    if (data === "Brush Teeth")
      image = require("../../assets/images/toothbrush.png");
    else if (data === "Make Smoothie")
      image = require("../../assets/images/smoothie.png");
    else if (data === "Put Away Bag")
      image = require("../../assets/images/tasks.png");

    //   if(data != scanned){
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTask(
      <TouchableOpacity
        onPress={() => navigation.navigate("InstructionScreen", { task: data })}
      >
        <Card style={styles.card}>
          <CardItem cardBody>
            <Image
              source={image}
              style={{ width: wp("80%"), aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>{data}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
    setScanned(data);
    //   }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2A9D8F", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: hp("100%"),
        }}
      />
      <Text style={styles.title}>Scan QR</Text>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
      />
      {task}
      <Button
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.title}>
          <Entypo name="home" size={hp("4%")} color="white" />
          Back to HOME
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#264653",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  scanner: {
    width: wp("100%"),
    height: hp("50%"),
  },
  title: {
    fontWeight: "bold",
    fontSize: hp("4%"),
    color: "#fff",
    marginBottom: 30,
    // fontFamily: 'Rubik'
  },
  card: {
    width: wp("33%"),
    margin: 0,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  backButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginTop: 10,
    width: wp("100%"),
    height: hp("12%"),
    backgroundColor: "#F4A261",
    justifyContent: "center",
  },
});
