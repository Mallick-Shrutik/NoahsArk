import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PostDisplay from './src/components/PostDisplay.js';
import UseAI from './src/components/UseAI';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="PostDisplay" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="PostDisplay" component={PostDisplay} />
                    <Stack.Screen name="UseAI" component={UseAI} />
                </Stack.Navigator>
                <Footer />
            </View>
        </NavigationContainer>
    );
}

function Footer() {
    const navigation = useNavigation();
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('PostDisplay')}>
                <Text style={styles.footerText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UseAI')}>
                <Text style={styles.footerText}>Use AI</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#e1bee7',
        height: 100,
        width: '100%'
    },
    footerText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4a148c',
    },
});
