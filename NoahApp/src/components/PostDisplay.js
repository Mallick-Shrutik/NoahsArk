import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { fetchPosts, accessLangchain } from '../services/api';


const PostDisplay = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchPost = async () => {
        setLoading(true);
        const postDetails = await fetchPosts(userId);
        setPost(postDetails);
        setLoading(false);
    };
    const handleEdit = () => {
    };

    const handleSubmit = () => {
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

                            <View style={styles.buttonContainer}>
                                {/*<Button title="Edit" onPress={handleEdit} buttonStyle={styles.editButton} />*/}
                                <Button title="Submit" onPress={handleSubmit} buttonStyle={styles.submitButton} titleStyle={styles.submitButtonText} />
                            </View>
                        </View>
                    </View>
                )}
            </View>

            {/* <View style={styles.footer}>
                <Text style={styles.footerText}>Home</Text>
                <Text style={styles.footerText}>Use AI</Text>
            </View>*/}
        </View>
    );
};

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
        width: 400,
        height: 400,
        borderRadius: 12,
        marginBottom: 16,
    },
    captionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4a148c',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6200ee',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6200ee',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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


export default PostDisplay;
