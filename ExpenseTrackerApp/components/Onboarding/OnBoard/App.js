import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {Swiper} from 'react-native-swiper';

//installations for Swiper
/*
npm install react-native-swiper-flatlist --save
npm uninstall react-native-swiper-flatlist --save

Swiper import require - {Dimensions} from 'react-native' / {SwiperFlatList} from 'react-native-swiper-flatlist'

npm i react-native-swiper --save

Notes on  usage
<Swiper style={styles.wrapper} 
     showsButtons = { true }
     autoplay = { true }>
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
*/

/* Installation for ReactNativeSvg
https://www.npmjs.com/package/react-native-svg

expo install react-native-svg
npm install react-native-svg
*/

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper style={styles.wrapper} 
     showsButtons = { true }
     autoplay = { true }>
        // Start of slide 1
        <View style={styles.slide1}>
        <Text>ExpSense</Text>
        </View>
        
        // Start of  Slide 2
        <View style={styles.slide2}>
        <Image
          style={styles.image}
          source={{ uri:'..l/assets/image/svgTwo.png'}}/>
        <Text>Be Financially Viable</Text>
        <Text>Maintain Full Clarity Over {'\n'} Your State Of Finance</Text>

        </View>

        // slide 3
        <View style={styles.slide3}>
          <Image
            style={styles.image}
            source={{ uri:'..l/assets/image/svgThree.png'}}/>
          <Text>With Expenditure Control</Text>
          <Text>Enhance Your State Of Conrol {'\n'} With Perspectives</Text>
        </View>

        // slide 4
        <View style={styles.slide4}>
          <Image
            style={styles.image}
            source={{ uri:'..l/assets/image/svgFour.png'}}/>
          <Text>Concrete Overviewing</Text>
          <Text>With ExpSense Scans And Reporting</Text>
        </View>

        //slide 5
        <View style={styles.slide5}>
          <Image
            style={styles.image}
            source={{ uri:'..l/assets/image/svgFive.png'}}/>
          <Text>Concrete Overviewing</Text>
          <Text>With ExpSense Scans And Reporting</Text>
        </View>

        // Slide 6 Sign up
        <View style={styles.slide6}>
          <Image
            style={styles.image}
            source={{ uri:'..l/assets/image/svgOne.png'}}/>
          <ComponentSignUp/>
          
        </View>
</Swiper>

     // <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
