import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

export default function WelcomeScreen() {
  const navigation: any = useNavigation();

  function cerrarCesion() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
        Alert.alert('Mensaje', 'Cesion Cerrada');
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/no-current-user':
            errorMessage = 'No hay un usuario autenticado actualmente.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Error de red. Por favor, verifica tu conexión a Internet.';
            break;
          default:
            errorMessage = 'Ocurrió un error al intentar cerrar la sesión. Por favor, inténtalo de nuevo.';
            break;
        }

        Alert.alert('Error', errorMessage);
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <TouchableOpacity style={styles.button} onPress={cerrarCesion}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff4757',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
