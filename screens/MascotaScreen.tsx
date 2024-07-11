import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { db } from '../config/Config';

export default function MascotaScreen() {
    const [id, setid] = useState("");
    const [nombre, setnombre] = useState("");
    const [especie, setespecie] = useState("");
    const [edad, setedad] = useState("");

    function limpiarCampos() {
        setid("");
        setnombre("");
        setespecie("");
        setedad("");
    }

    function guardarMascota() {
        set(ref(db, 'mascotas/' + id), {
            name: nombre,
            spice: especie,
            age: edad
        });
        limpiarCampos();
    }

    function editar() {
        update(ref(db, 'mascotas/' + id), {
            name: nombre,
            spice: especie,
            age: edad
        });
        limpiarCampos();
    }

    function leerMascota() {
        const starCountRef = ref(db, 'mascotas/' + id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                Alert.alert("Error..!", "Elemento no encontrado");
                limpiarCampos();
            } else {
                setnombre(data.name);
                setespecie(data.spice);
                setedad(data.age);
            }
        });
    }

    function eliminar() {
        remove(ref(db, 'mascotas/' + id));
        limpiarCampos();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* GUARDAR */}
            <View style={styles.section}>
                <Text style={styles.title}>GUARDAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.input}
                    onChangeText={(texto) => setid(texto)}
                    value={id}
                />
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.input}
                    onChangeText={(texto) => setnombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.input}
                    onChangeText={(texto) => setespecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.input}
                    onChangeText={(texto) => setedad(texto)}
                    value={edad}
                />
                <Button title='Guardar' onPress={guardarMascota} />
            </View>

            <View style={styles.separator} />

            {/* EDITAR */}
            <View style={styles.section}>
                <Text style={styles.title}>EDITAR</Text>
                <View style={styles.row}>
                    <TextInput
                        placeholder='Ingresar id'
                        style={[styles.input, styles.inputSmall]}
                        onChangeText={(texto) => setid(texto)}
                        value={id}
                    />
                    <Button title='Buscar' color='#299979' onPress={leerMascota} />
                </View>
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.input}
                    onChangeText={(texto) => setnombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.input}
                    onChangeText={(texto) => setespecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.input}
                    onChangeText={(texto) => setedad(texto)}
                    value={edad}
                />
                <Button title='Guardar' color='green' onPress={editar} />
            </View>

            <View style={styles.separator} />

            {/* ELIMINAR */}
            <View style={styles.section}>
                <Text style={styles.title}>ELIMINAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.input}
                    onChangeText={(texto) => setid(texto)}
                    value={id}
                />
                <Button title='Eliminar' color='red' onPress={eliminar} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    separator: {
        marginVertical: 20,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    section: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    input: {
        width: '100%',
        backgroundColor: '#eaeaea',
        height: 40,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputSmall: {
        width: '70%',
    },
});
