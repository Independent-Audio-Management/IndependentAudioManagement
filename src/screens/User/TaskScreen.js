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
import { Container, Card, CardItem, Text, Button } from "native-base";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { db } from "../../utils/firebase";
const width = Dimensions.get("window").width;

export default function TaskScreen({ navigation }) {
  const [userId, settUserId] = useState("36112759-7710-4c22-b63b-8433b507f02e");
  const [tasks, setTasks] = useState([]);
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    const onValueChange = db
      .ref(`/users/${userId}/tasks`)
      .on("value", (snapshot) => {
        console.log("User datas: ", snapshot.val());
        let dbTasks = snapshot.val();
        let keys = Object.keys(dbTasks);
        const taskMap = new Set(keys.map((key) => dbTasks[key].category));
        const fetchedTasks = [...taskMap].map((category) => {
          const data = keys
            .filter((key) => dbTasks[key].category === category)
            .map((key) => {
              return { id: key, ...dbTasks[key] };
            });
          console.log("data", data);
          var newArr = [];
          while (data.length) newArr.push(data.splice(0, 2));

          console.log(newArr);
          return { category: category, tasks: newArr };
        });
        console.log("Fetched datas: ", fetchedTasks);
        setTasks(fetchedTasks);
      });
    // Stop listening for updates when no longer required
    return () => db.ref(`/users/${userId}`).off("value", onValueChange);
  }, [userId]);

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
          height: 1500,
        }}
      />
      <Text style={styles.subtitle}>Next</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("InstructionScreen", { task: "Make Smoothie" })
        }
      >
        <Card style={styles.highlight}>
          <CardItem cardBody>
            <Image
              source={require("../../assets/images/smoothie.png")}
              style={{ height: undefined, width: "40%", aspectRatio: 1 }}
            />
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.buttonText}>Make Smoothie</Text>
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
                                style={{ height: 100, width: null, flex: 1 }}
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
        <Text style={styles.buttonText}>
          <Entypo name="home" size={30} color="white" /> Back to HOME
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
    height: 200,
    width: width - 40,
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
    height: 150,
    width: width / 2 - 30,
    marginLeft: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  subtitle: {
    // fontWeight:"bold",
    fontSize: 20,
    color: "#fff",
    marginLeft: 20,
    marginTop: 30,
    fontFamily: "Rubik",
    textTransform: "capitalize",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  backButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "12%",
    backgroundColor: "#F4A261",
    justifyContent: "center",
  },
});
