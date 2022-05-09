import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useState, useEffect } from 'react'
import Swiper from 'react-native-swiper'
import { View, Text, Image, ScrollView, TextInput } from 'react-native';



// installation required: $ npm i react-native-cli -g
// Initialized with: react-native init

/*Ref
const Cat = () => {
  return (
    <Text>Hello, I am your cat!</Text>
  );
}

export default Cat;*/



export default function OnboardScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.box} />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      width: 150,
      height: 150,
      backgroundColor: '#3B6CD4',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
    },

    slide1: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
      },
     
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
  
      
    })

    export default class SwiperComponent extends Component {
        render() {
          return (
            <Swiper style={styles.wrapper} showsButtons={true}>
              <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
              </View>
            </Swiper>
          )
        }
      }
      
      AppRegistry.registerComponent('myproject', () => SwiperComponent)
      

  