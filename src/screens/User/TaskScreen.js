import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Container, Card, CardItem, Text } from 'native-base';
import { Image } from 'react-native';

export default function QRScreen() {
    const [loaded] = useFonts({
        Rubik: require('../assets/fonts/Rubik-Medium.ttf'),
    })

    if (!loaded) {
        return null
    }

  return (
      <Container style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#F4A261', 'transparent']}
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 2000,
            }}
        />
        <Text style={styles.title}>Hello Gabe!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('OffersScreen', {offers: offersArray } ) }>
          <Card  style={styles.card1}>
          <CardItem cardBody>
              <Image source={require('../assets/images/scanQR.png')} style={{height: undefined, width: '80%', aspectRatio: 1}}/>
            </CardItem>
            <CardItem cardBody>
                <Text style={styles.buttonText}>Scan</Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OffersScreen', {offers: offersArray } ) }>
          <Card  style={styles.card2}>
          <CardItem cardBody>
                <Image source={require('../assets/images/tasks.png')} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            <CardItem cardBody>
                <Text style={styles.buttonText}>Tasks</Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E76F51',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  card1: {
    height: 300,
    width: 300, 
    margin: 0, 
    padding: 0, 
    justifyContent:'center', 
    alignItems: 'center',  
    borderRadius: 45,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10 ,
    shadowOffset : { width: -15, height: 15}
  },
  card2: {
    height: 300,
    width: 300, 
    margin: 0, 
    padding: 0, 
    justifyContent:'center', 
    alignItems: 'center',  
    borderRadius: 45,
    marginTop: 30,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10 ,
    shadowOffset : { width: -15, height: 15}
  },
  title:{
    // fontWeight:"bold",
    fontSize:50,
    color: '#fff',
    marginBottom:30,
    fontFamily: 'Rubik'
  },
  buttonText:{
    // fontWeight:"bold",
    fontSize:30,
    fontFamily: 'Rubik'
  }
});