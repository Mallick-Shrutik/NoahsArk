import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { accessLangchain } from '../services/api';

export default function UseAI() {

    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState('');

    const generateTextUsingLangchain = async () => {
        setLoading(true);
        const llmResponse = await accessLangchain();
        if (llmResponse) {
            setPost(llmResponse.data);
        } else {
            console.error('Failed to generate text.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to Noah!</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Generate SEO Captions Using AI"
                    onPress={generateTextUsingLangchain}
                    disabled={loading}
                    color={loading ? 'gray' : '#007BFF'}
                />
            </View>

            {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}

            {!loading && post && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{post}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff',
        border: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    header: {
        padding: 16,
        backgroundColor: '#e1bee7',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a148c',
        marginTop: 40
    },
    buttonContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        top: 400,
    },
    loader: {
        marginTop: 20,
    },
    resultContainer: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
});
