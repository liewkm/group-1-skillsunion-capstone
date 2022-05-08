import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Button from '../commonUI/Button'

function BarcodeScanner({scanHandler, setIsCameraVisible}) {
  
  const [cameraPermission, setCameraPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [upc, setUpc] = useState('No UPC scanned')
  
  const askCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
        setCameraPermission(status === 'granted')
    })() 
  }
  const barCodeScannerHandler = ({ type, data }) => {
    setScanned(true);
    // setUpc(data)
    scanHandler(data);
    console.log(`Type: ${type} UPC data: ${data}`);
    setIsCameraVisible(false);
  }

  // Ask for camera permission on component mount
  useEffect(() => {
    askCameraPermission();
  }, [])

  // Return to input form with UPC data when scan successful
/*
  useEffect(() => {
    if (scanned) {
      console.log('BarcodeScanner->useEffect upc:', upc);
      navigation.navigate({
        name: 'ManageExpense',
        params: { data: upc },
        merge: true
      })
    }
  }, [scanned] )  
*/

  // Check for camera permission and return
  if (cameraPermission === null) {
    return (<View style={styles.container}>
      <Text>Requesting camera permission</Text>
    </View>)
  }  
  
  if (cameraPermission === false) {
    return (<View style={styles.container}>
      <Text style={{ margin: 10 }}>No access to camera</Text>
      <Button title={'Allow camera permission'}
        onPress={() => askCameraPermission()} />
    </View>)
  }

  // Return the camera View
  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : barCodeScannerHandler}
          style={ {width: 450, height: 450} } 
        />
        <Button style={styles.button} onPress={() => setIsCameraVisible(false)}>
          CLOSE
        </Button>
      </View>
      {/* <Text style={styles.text}>{upc}</Text> */}

      {/* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    margin: 20,
  },
  barcodeBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    minWidth: 100,
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

export default BarcodeScanner