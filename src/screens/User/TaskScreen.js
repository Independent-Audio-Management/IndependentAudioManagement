import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Card, CardItem, Text, Button } from "native-base";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { db } from "../../utils/firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function TaskScreen({ navigation }) {
  const [userId, settUserId] = useState("36112759-7710-4c22-b63b-8433b507f02e");
  const [tasks, setTasks] = useState([]);
  const [highlight, setHighlight] = useState({});
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    const onValueChange = db
      .ref(`/users/${userId}/tasks`)
      .on("value", (snapshot) => {
        let dbTasks = snapshot.val();
        let keys = Object.keys(dbTasks);
        const categorySet = new Set(keys.map((key) => dbTasks[key].category));
        const fetchedTasks = [...categorySet].map((category) => {
          const task1d = keys
            .filter((key) => dbTasks[key].category === category)
            .map((key) => {
              return { id: key, ...dbTasks[key] };
            });
          setHighlight(task1d[getRandomInt(task1d.length)]);
          var tasks2d = [];
          while (task1d.length) tasks2d.push(task1d.splice(0, 2));
          return { category: category, tasks: tasks2d };
        });
        setTasks(fetchedTasks);
      });
    // Stop listening for updates when no longer required
    return () => db.ref(`/users/${userId}`).off("value", onValueChange);
  }, [userId]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#2A9D8F", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: hp("100%"),
        }}
      />
      <Text style={styles.subtitle}>Next</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("InstructionScreen", {
            instructions: highlight.instructions,
            title: highlight.name,
          })
        }
      >
        <Card style={styles.highlight}>
          <CardItem cardBody>
            <Image
              source={{ uri: highlight.image }}
              style={{ width: wp("40%"), aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>{highlight.name}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
      <ScrollView style={{ marginBottom: 100 }}>
        {tasks.map((elem, i) => {
          return (
            <View key={"category" + i}>
              <Text style={styles.subtitle}>{elem.category}</Text>
              {elem.tasks.map((taskRow, i) => {
                return (
                  <View
                    style={{ flex: 1, flexDirection: "row" }}
                    key={"categoryRow" + i}
                  >
                    {taskRow.map((task, i) => {
                      return (
                        <TouchableOpacity
                          key={"task" + i}
                          onPress={() =>
                            navigation.navigate("InstructionScreen", {
                              instructions: task.instructions,
                              title: task.name,
                            })
                          }
                        >
                          <Card style={styles.tasks}>
                            <CardItem cardBody>
                              <Image
                                source={{ uri: task.image }}
                                style={{ height: hp("12%"), flex: 1 }}
                              />
                            </CardItem>
                            <CardItem cardBody>
                              <Text style={styles.buttonText}>{task.name}</Text>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <Button
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backButtonText}>
          <Entypo name="home" size={hp("4%")} color="white" /> Back to HOME
        </Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#264653",
  },
  highlight: {
    height: hp("22%"),
    width: wp("92%"),
    marginLeft: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: -15, height: 15 },
  },
  tasks: {
    height: hp("17%"),
    width: wp("43%"),
    marginLeft: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  subtitle: {
    // fontWeight:"bold",
    fontSize: hp("3%"),
    color: "#fff",
    marginLeft: 20,
    marginTop: 30,
    fontFamily: "Rubik",
    textTransform: "capitalize",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  backButtonText: {
    fontWeight: "bold",
    fontSize: hp("4%"),
  },
  backButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: wp("100%"),
    height: hp("10%"),
    backgroundColor: "#F4A261",
    justifyContent: "center",
  },
});
