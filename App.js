import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default function App() {

const [hasPermission, setHasPermission] = useState(null)
const [scanned, setScanned] = useState(false)
const [text, setText] = useState('')

const askForCameraPermission = () => {
  (async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status == 'granted');
  })()
}

useEffect(() => {
  askForCameraPermission();
}, [])

const handleBarCodeScanned = ({type, data}) => {
  setScanned(true)
  setText(data)
  console.log('Type' + type + '\nData: ' + data)
}

// check for permissions

if(hasPermission === null) {
  return(
    <View style={styles.container}>
      <Text>Requesting for camera permissions</Text>    
  </View>
  )
}

if(hasPermission === false) {
  return(
    <View style={styles.container}>
      <Text style={{margin: 10}}>No access to camera</Text>   
      <Button title={'Alloca Camera'} onPress={() => askForCameraPermission()} />
  </View>
  )
}

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height: 400, width: 400}}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>    
      {scanned && <Button title='Scan again?' onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems:'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
});
