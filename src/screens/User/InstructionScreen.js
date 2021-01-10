import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button, Card, CardItem } from 'native-base';
import { SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import { hardcodedInstructions } from './HardcodedInstructions';
import ProgressBar from 'react-native-progress/Bar';
import { Audio } from 'expo-av';

const width = Dimensions.get('window').width

export default function InstructionScreen({ navigation, route }) {
    
    const [loaded] = useFonts({
        Rubik: require('../../assets/fonts/Rubik-Regular.ttf'),
    })

    const [currentStepNum, setCurrentStepNum] = useState(0);

    if (!loaded) return null;

    let steps = hardcodedInstructions[route.params.task];

    // play audio
    let soundObject = new Audio.Sound();
    let audioPromise = new Promise((resolve, reject) => {
        soundObject.loadAsync(steps[currentStepNum].audio, { shouldPlay: true });
        soundObject.setOnPlaybackStatusUpdate(status => {
            if (status.didJustFinish) {
                if (currentStepNum <= steps.length - 2) {
                    setTimeout(() => {
                        setCurrentStepNum(s => s + 1);                        
                    }, 3000);
                }
            }
        });
    }).then(() => {
        soundObject.unloadAsync();
    });

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#F4A261', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 1500,
                }}
            />
            <Text style={styles.title}>{route.params.task}</Text>

            {steps.length > 0 ? <>
            <ProgressBar 
                marginTop={10}
                marginLeft={14} 
                progress={currentStepNum / steps.length} 
                width={0.9 * width} 
                color='#2A9D8F' 
                backgroundColor={"#fff"}
                borderWidth={0}
                height={10} 
            />
            <Text style={styles.progressPercentage}>{Math.round(currentStepNum / steps.length * 100)}% Done</Text>

            <Card style={styles.highlight}>
                <CardItem cardBody>
                        {steps[currentStepNum] != undefined && <Image source={steps[currentStepNum].image} 
                        style={{ height: undefined, width: '50%', aspectRatio: 1 }} />}
                </CardItem>
                <CardItem cardBody>
                    {steps[currentStepNum] != undefined && <Text style={styles.cardText}>{steps[currentStepNum].text}</Text>}
                </CardItem>
            </Card>

            <TouchableOpacity onPress={() => {
                soundObject.replayAsync();
            }}>
            <Card style={styles.replayAudioCard}>
                <CardItem cardBody>
                    <Text style={styles.replayAudio}><Entypo name="cw" size={30} color="black" /> Replay Audio</Text>
                </CardItem>
            </Card>
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'row' }}>

                {currentStepNum == 0 ? <>
                        <Card style={{ ...styles.circleCard, backgroundColor: "gray"}}>
                            <Entypo name="arrow-bold-left" size={50} color="black" />
                            <Text style={styles.stepText}>Previous step</Text>
                        </Card>
                </> 
                : 
                    <TouchableOpacity onPress={() => {
                        // previous step button pressed
                        if (currentStepNum >= 1) {
                            setCurrentStepNum(s => s - 1);
                            soundObject.stopAsync();
                        }
                    }}>
                        <Card style={styles.circleCard}>
                            <Entypo name="arrow-bold-left" size={50} color="black" />
                            <Text style={styles.stepText}>Previous step</Text>
                        </Card>
                    </TouchableOpacity>
                }

                {currentStepNum == steps.length - 1 ? <>
                        <TouchableOpacity onPress={() => {
                            soundObject.stopAsync();
                            navigation.navigate('CongratsScreen');
                        }}>
                            <Card style={{...styles.circleCard, backgroundColor: "green"}}>
                                <Entypo name="check" size={75} color="white" />
                                <Text style={{...styles.stepText, color: "#fff"}}>Task done</Text>
                            </Card>
                        </TouchableOpacity>
                </>
                : 
                    <TouchableOpacity onPress={() => {
                        if (currentStepNum < steps.length - 1) {
                            setCurrentStepNum(s => s + 1);
                            soundObject.stopAsync();
                        }
                    }}>
                        <Card style={styles.circleCard}>
                            <Entypo name="arrow-bold-right" size={50} color="black" />
                            <Text style={styles.stepText}>Next step</Text>
                        </Card>
                    </TouchableOpacity>
                }
            </ View>
            </> : <></> }
        
            <Button style={styles.backButton} onPress={() => {
                soundObject.stopAsync();
                navigation.navigate('Task');
            }}>
                <Text style={styles.buttonText}><Entypo name="reply" size={30} color="white" /> Back to TASKS</Text>
            </Button>
        </ SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    highlight: {
        height: 230,
        width: (width) - 40,
        marginLeft: 20,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: -15, height: 15 }
    },
    title: {
        // fontWeight:"bold",
        fontSize: 40,
        color: '#fff',
        marginLeft: 20,
        marginTop: 30,
        fontFamily: 'Rubik'
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    backButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '12%',
        backgroundColor: '#2A9D8F',
        justifyContent: "center"
    },
    progressPercentage: {
        fontSize: 15,
        color: '#000',
        marginLeft: 15
    },
    cardText: {
        fontSize: 20
    },
    replayAudio: {
        fontSize: 30,
        fontWeight: "bold"
    },
    replayAudioCard: {
        height: 80,
        width: (width) - 40,
        marginLeft: 20,
        marginTop: 10,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: -15, height: 15 }
    },
    circleCard: {
        height: 140,
        width: (width/2) - 35,
        marginLeft: 22,
        marginTop: 8,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: -15, height: 15 }
    },
    stepText: {
        fontSize: 18
    }
});