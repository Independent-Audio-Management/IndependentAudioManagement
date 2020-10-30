import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Container, Card, CardItem, Text, Button } from 'native-base';
import { Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
const width = Dimensions.get('window').width

export default function QRScreen({ navigation }) {
    const [loaded] = useFonts({
        Rubik: require('../../assets/fonts/Rubik-Regular.ttf'),
    })

    if (!loaded) {
        return null
    }

    const tasks = [{category: 'Morning', tasks: [['Make Bed', 'Brush Teeth'], ['Wash Face', 'Comb Hair']]}, {category: 'Motivators', tasks: [['Make Smoothie', 'Bake Cookies']]}]

  return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#2A9D8F', 'transparent']}
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 1500,
            }}
        />
        <Text style={styles.subtitle}>Next</Text>
        <TouchableOpacity onPress={() => navigation.navigate('OffersScreen', {offers: offersArray } ) }>
          <Card  style={styles.highlight}>
          <CardItem cardBody>
              <Image source={require('../../assets/images/toothbrush.png')} style={{height: undefined, width: '50%', aspectRatio: 1}}/>
            </CardItem>
            <CardItem cardBody>
                <Text style={styles.buttonText}>Brush Teeth</Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
        <ScrollView style={{marginBottom:100}}>
        {tasks.map((elem,i) => {
        return (<View>
          <Text style={styles.subtitle}>{elem.category}</Text>
          {elem.tasks.map((taskRow,i)=>{
            return(
            < View style={{flex :1, flexDirection: 'row'}}>
{taskRow.map((task,i)=>{
            return (<TouchableOpacity onPress={() => navigation.navigate('OffersScreen', {offers: offersArray } ) }>
               <Card  style={styles.tasks}>
               <CardItem cardBody>
                     {/* <Image source={require('../../assets/images/tasks.png')} style={{height: 50, width: null, flex: 1}}/> */}
                   </CardItem>
                 <CardItem cardBody>
                     <Text style={styles.buttonText}>{task}</Text>
                   </CardItem>
               </Card>
             </TouchableOpacity>)
                       })}

             </View>
           )
          })}
          </View> 
          )
        })}
          </ScrollView>

        {/* < View style={{flex :1, flexDirection: 'row'}}>
         <TouchableOpacity onPress={() => navigation.navigate('OffersScreen', {offers: offersArray } ) }>
            <Card  style={styles.tasks}>
            <CardItem cardBody>
                  <Image source={require('../../assets/images/tasks.png')} style={{height: 50, width: null, flex: 1}}/>
                </CardItem>
              <CardItem cardBody>
                  <Text style={styles.buttonText}>{e}</Text>
                </CardItem>
            </Card>
          </TouchableOpacity>
        </View>   */}
            <Button style={styles.backButton} onPress={() => navigation.navigate('Home') }>
          <Text style={styles.buttonText}><Entypo name="home" size={30} color="white"/>Back to HOME</Text>
        </Button>
        
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653'
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center'
  },
  highlight: {
    height: 200,
    width: (width) - 40, 
    marginLeft: 20,
    padding: 0, 
    justifyContent:'center', 
    alignItems: 'center',  
    borderRadius: 45,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10 ,
    shadowOffset : { width: -15, height: 15}
  },
  tasks: {
    height: 150,
    width: (width / 2) - 30, 
    marginLeft: 20,
    padding: 0, 
    justifyContent:'center', 
    alignItems: 'center',  
    borderRadius: 15,
  },
  subtitle:{
    // fontWeight:"bold",
    fontSize:20,
    color: '#fff',
    marginLeft: 20,
    marginTop:30,
    fontFamily: 'Rubik'
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  backButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    width: '100%',
    height: '12%',
    backgroundColor: '#F4A261',
    justifyContent: "center"
  }
});