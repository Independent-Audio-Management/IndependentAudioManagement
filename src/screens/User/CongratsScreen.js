import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Text, Button } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 

export default function CongratsScreen({navigation}) {

    const [loaded] = useFonts({
        Rubik: require('../../assets/fonts/Rubik-Regular.ttf'),
    })

    if (!loaded) return null;

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
            <Text style={{
                fontSize: 40,
                color: '#fff',
                marginLeft: 20,
                marginTop: 60,
                fontFamily: 'Rubik'
            }}>Congratulations!</Text>
            <Text style={{
                fontSize: 25,
                color: '#fff',
                marginLeft: 35,
                marginTop: 10,
                fontFamily: 'Rubik'
            }}>You completed the task!</Text>

            <Button style={styles.backButton} onPress={() => navigation.navigate('Task')}>
                <Text style={styles.buttonText}><Entypo name="reply" size={30} color="white" /> Back to TASKS</Text>
            </Button>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center'
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
});