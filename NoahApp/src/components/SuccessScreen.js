import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation, route }) => {
    const { message } = route.params;

    return (
        <View style={styles.container}>

        <View style={styles.header}>
                        <Text style={styles.headerText}>Welcome to Noah!</Text>
                    </View>


            <Text style={styles.successText}>Success</Text>
            <Text style={styles.messageText}>{message}</Text>
            <Button title="Go Back" onPress={() => navigation.navigate('PostDisplay')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    header: {
            padding: 16,
            backgroundColor: '#e1bee7',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4a148c',
            marginTop: 40
        },
    successText: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 10 },
    messageText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});

export default SuccessScreen;
