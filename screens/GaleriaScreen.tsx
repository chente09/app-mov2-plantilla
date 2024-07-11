import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/Config';

export default function GaleriaScreen() {
    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    async function subir() {
        
        const storageRef = ref(storage, 'avatars/' + 'imagen');

        const response = await fetch(image);
        const blob = await response.blob();

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('ARCHIVO SUBIDO');
        });

        // Obtiene la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log('URL de desacarga de la imagen', imageURL);
    }
    

    return (
        <View style={styles.container}>
            <Button title="TRAER UNA IMAGEN DESDE GALERIA" onPress={pickImage} />
            <Image source={{ uri: image }} style={styles.image} />
            <Button title='Subir Imagen' color={'gray'} onPress={()=>subir()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1f1f1f17"
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
})