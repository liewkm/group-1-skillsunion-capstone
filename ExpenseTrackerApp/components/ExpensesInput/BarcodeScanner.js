/*-------------------------------------------------------------------
  BarcodeScanner component to capture barcode and returns a 
  UPC (Unique Product Code). 
  PROPS:
    scanHandler - Handler for UPC data (as numerical string) to parent
    setIsCameraVisible - Hanlder to toggle camera viewfinder modal window
*/

import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Button from '../commonUI/Button'

function BarcodeScanner({scanHandler, setIsCameraVisible}) {
  
  const [cameraPermission, setCameraPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  
  // Handler for asking camera permission
  const askCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
        setCameraPermission(status === 'granted')
    })() 
  }
  // Handler triggered when barcode is detected in camera viewfinder
  const barCodeScannerHandler = ({ type, data }) => {
    setScanned(true);
    scanHandler(data);
    console.log(`Type: ${type} UPC data: ${data}`);
    setIsCameraVisible(false);
  }

  // Ask for camera permission on component mount
  useEffect(() => {
    askCameraPermission();
  }, [])

  // Return appropriate message according to cameraPermission status 
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

  //----------------------------------------------------------------------------
  
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