import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { storage } from "firebase";
import { Button, Card, CardItem, Text, Icon } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AuthUserContext } from "../../navigations/AuthUserProvider";
import { dbh } from "../../utils/firebase";

export default function AdminTaskScreen({ navigation }) {
  const { user } = useContext(AuthUserContext);
  const [uid] = useState(user.uid);
  const [tasks, setTasks] = useState([]);
  const [loaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      if (!isCancelled) {
        const userRef = dbh.collection("Users").doc(`${uid}`);
        const user = await userRef.get();
        const taskIds = user.data().tasks;
        const taskQuery = dbh.collection("Tasks").where("id", "in", taskIds);
        const dbTasks = [];
        taskQuery.onSnapshot(
          (querySnapshot) => {
            console.log(
              `Received query snapshot of size ${querySnapshot.size}`
            );
            querySnapshot.forEach((doc) => dbTasks.push({ ...doc.data() }));
            console.log(dbTasks.length);
            const categorySet = new Set(
              dbTasks.map((currTask) => currTask.category)
            );

            const fetchedTasks = [...categorySet]
              .map((category) => {
                const task1d = dbTasks
                  .filter(
                    (dbTask) =>
                      dbTask.category === category && dbTask.disabled === false
                  )
                  .map((elem) => {
                    return { ...elem };
                  });
                var tasks2d = [];
                while (task1d.length) tasks2d.push(task1d.splice(0, 2));
                return { category: category, tasks: tasks2d };
              })
              .filter((elem) => elem.tasks.length > 0);
            setTasks(fetchedTasks);
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

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
      <View
        style={{
          alignSelf: "flex-end",
          zIndex: 1,
        }}
      >
        <Button
          iconLeft
          rounded
          style={{
            marginRight: 10,
            backgroundColor: "#2A9D8F",
          }}
          onPress={() => {
            var newDocRef = dbh.collection("Tasks").doc();
            newDocRef.set({});
            navigation.navigate("AdminTaskEdit", {
              id: newDocRef.id,
              instructions: [],
              taskname: "",
              category: "",
              time: "",
              image: null,
              audio: null,
            });
          }}
        >
          <Icon name="add" />
          <Text>Add</Text>
        </Button>
      </View>
      <ScrollView style={{ marginBottom: 100, marginTop: -50 }}>
        {tasks.map((elem, i) => {
          return (
            <View key={elem.id} key={"row" + i}>
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
                            navigation.navigate("AdminTaskEdit", {
                              id: task.id,
                              instructions: task.instructions,
                              taskname: task.name,
                              category: task.category,
                              time: task.time,
                              image: task.image,
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
        <Image
          source={require("../../assets/icons/home.png")}
          fadeDuration={0}
          style={{
            width: wp("10%"),
            aspectRatio: 1,
            resizeMode: "contain",
            marginBottom: 10,
          }}
        />
        <Text style={styles.backButtonText}>Back to HOME</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#264653",
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
