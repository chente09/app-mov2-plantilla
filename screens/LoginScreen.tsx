import { Button, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Drawer');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let titulo = '';
        let mensaje = '';

        switch (errorCode) {
          case 'auth/invalid-email':
            titulo = 'Correo inválido';
            mensaje = 'Revisar que el email sea el correcto';
            break;
          case 'auth/invalid-credential':
            titulo = 'Error de Usuario';
            mensaje = 'El usuario no se encuentra registrado';
            break;
          case 'auth/missing-password':
            titulo = 'Error en Contraseña';
            mensaje = 'La contraseña es incorrecta';
            break;
          default:
            titulo = 'Error';
            mensaje = 'Revisar credenciales';
            break;
        }

        console.log(errorCode);
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresa contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>👉 Regístrate aquí 👈</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007bff',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
