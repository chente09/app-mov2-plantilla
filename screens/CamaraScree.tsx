import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/Config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


export default function CamaraScree() {

  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function subir(nombre:string) {
    const storageRef = ref(storage, 'camara/' + nombre);

    try {
        const response = await fetch(image);
        const blob = await response.blob();

        uploadBytes(storageRef, blob).then(()=>{
          
        })

        console.log('La imagen se subió con éxito');

        // Obtiene la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
        console.error(error);
    }
}

  return (
    <View style={styles.container}>
      <Button title="TRAER IMG DESDE LA CAMARA" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title='SUBIR' color={'gray'} onPress={()=>subir('foto')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode:'contain'
  },
});