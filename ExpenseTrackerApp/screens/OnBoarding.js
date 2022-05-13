import { StyleSheet, Text, View, Image } from 'react-native';
import { GlobalColors } from '../utilities/colors';
import Swiper from 'react-native-swiper';
import Button from '../components/commonUI/Button';

import onboard1 from '../assets/onboard1.png';
import onboard2 from '../assets/onboard2.png';
import onboard3 from '../assets/onboard3.png';
import onboard4 from '../assets/onboard4.png';

const image1 = Image.resolveAssetSource(onboard1).uri;
const image2 = Image.resolveAssetSource(onboard2).uri;
const image3 = Image.resolveAssetSource(onboard3).uri;
const image4 = Image.resolveAssetSource(onboard4).uri;

const Slide = ({ image, children }) => {
  return (
      <View style={ styles.slide }>
        <Image style={ styles.image }
          source={{ uri: image }}
          resizeMode='contain'
        />
        { children }
      </View>
  )
}

export default function OnBoarding({ navigation }) {
  return (
    <View style={styles.container}>
      <Swiper showsButtons loop={false}>
        <Slide image={image1} />
        <Slide image={image2} />
        <Slide image={image3} />
        <Slide image={image4}>
          <Button style={styles.button} onPress={() => navigation.navigate('Login')}>
            Let's Go!
          </Button> 
        </Slide>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.primary800,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.primary800,
    paddingTop: 25,
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    width: '100%',
  },
  button: {
    minWidth: 100,
    marginHorizontal: 16,
    marginBottom: 50,
  },
});


