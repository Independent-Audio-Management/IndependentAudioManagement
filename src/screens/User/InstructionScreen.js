import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from 'native-base';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import { hardcodedInstructions } from './HardcodedInstructions';
import ProgressBar from 'react-native-progress/Bar';
const width = Dimensions.get('window').width


export default function InstructionScreen({ navigation, route }) {
    
    const [loaded] = useFonts({
        Rubik: require('../../assets/fonts/Rubik-Regular.ttf'),
    })

    if (!loaded) return null;

    console.debug("hello!!");
    console.debug(route);
    console.debug(route.params.task);
    let steps = hardcodedInstructions[route.params.task];
    console.debug(steps);

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
            <ProgressBar 
                marginTop={10}
                marginLeft={14} 
                progress={0.3} 
                width={0.9 * width} 
                color='#2A9D8F' 
                height={10} 
            />
            <Text style={styles.progressPercentage}>29% Done</Text>
        
            <Button style={styles.backButton} onPress={() => navigation.navigate('Task')}>
                <Text style={styles.buttonText}><Entypo name="back" size={30} color="white" /> Back to TASKS</Text>
            </Button>
        </ SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center'
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
    }
});