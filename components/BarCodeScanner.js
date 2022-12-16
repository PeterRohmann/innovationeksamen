import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase/compat';

const BarCodeComponent = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Scan a barcode!')
  const [barcode,setBarcode] = useState({});

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  //spørg telefonen om lov til at bruge kameraet
  useEffect(() => {
    askForCameraPermission();
   
      firebase
          .database()
          .ref('/Barcode')
          .on('value', snapshot => {
              setBarcode(snapshot.val())
          });

  }, []);

  // Her er hvad der skal ske når stregkoden er scannet
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
    try{var index = Object.keys(barcode).findIndex(element => element == data)
var Item = Object.values(barcode)[index].name}
catch(error){
  console.log(`push Error: ${error.message}`);
  Alert.alert(`The ingredient does not exist in the database`);
}


//prøver først at opdatere
// ellers opretter den på ny
try {
  firebase
      .database()
      .ref('/Ingredients/')
      .push({Item});
  Alert.alert(`Din ingrediens er nu tilføjet`);
  setNewIngredient(initialState)
} catch (error) {
  console.log(`push Error: ${error.message}`);
}
navigation.navigate('Ingredient List');
  };

  // Her spørger man fpr permission, eller afviser
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return til view
  return (
    <ImageBackground source={require("../assets/opacity.png")}  style={styles.image} >
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
    </ImageBackground>
  );
}

export default BarCodeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: `#000000`
  },
  image: {
    opacity: 1,
    height: "100%",
    width: "100%"
 }
});