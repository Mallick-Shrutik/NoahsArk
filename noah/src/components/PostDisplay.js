import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, StatusBar, TextInput, Alert } from 'react-native';
import { fetchPosts,submitProductListing  } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const PostDisplay = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [conditionType, setConditionType] = useState('');

    const navigation = useNavigation();

    const handleFetchPost = async () => {
        const userId = "17841471036101129"
        setLoading(true);
        const postDetails = await fetchPosts(userId);
        setPost(postDetails);
        setLoading(false);
    };

    const handleSubmit = () => {
        if (!title || !price || !quantity || !conditionType) {
            Alert.alert('Error', 'Please fill in all mandatory fields: Title, Price, Quantity, and Condition Type.');
            return;
        }

        // Display confirmation dialog
        Alert.alert(
            "Are you sure to list the product?",
            "This product will now be listed on Amazon",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => {
                        // Call function to trigger Amazon SP-API
                        triggerAmazonSPAPI();
                    }
                }
            ]
        );
    };

    const triggerAmazonSPAPI = async () => {
            try {
                const response = await submitProductListing(title, price, quantity, conditionType);
                navigation.navigate('Success', { message: "Product listing has been submitted successfully." });
            } catch (error) {
                navigation.navigate('Error', { message: "Failed to submit product listing." });
            }
        };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to Noah!</Text>
            </View>

            <View style={styles.content}>
                {!post && (
                    <Button title="See what's my latest post on Instagram?" onPress={handleFetchPost} />
                )}
                {loading && <ActivityIndicator size="large" color="#6200ee" />}

                {post && (
                    <View style={styles.cardContainer}>

                        <View style={styles.postCard}>

                            <View style={styles.imageAndTextContainer}>
                                <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
                                <Text style={styles.captionText}>{post.caption}</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={price}
                                    onChangeText={setPrice}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Condition Type"
                                    value={conditionType}
                                    onChangeText={setConditionType}
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                <Button title="Submit to Amazon" onPress={handleSubmit} color="#6200ee" />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff',
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
    imageAndTextContainer: {
         alignItems: 'center',
         justifyContent: 'center',
     },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    postContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    postImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
        marginTop:100,
    },
    captionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4a148c',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4a148c',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
});

export default PostDisplay;
