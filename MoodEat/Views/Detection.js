import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, withStyles } from '@ui-kitten/components';
import allActions from '../stores/actions';

export default function DetectionPage(props) {

    const user = useSelector((state) => state.user);
    let mood = user.mood;

    switch (mood) {
        case 'anger':
            mood = 'an angry'
            break;
        case 'disgust':
            mood = 'a disgusted'
            break;
        case 'fear':
            mood = 'a scared'
            break;
        case 'happiness':
            mood = 'a happy'
            break;
        case 'neutral':
            mood = 'a neutral'
            break;
        case 'sadness':
            mood = 'a sad'
            break;
        case 'surprise':
            mood = 'a surprised'
            break;
        case 'contempt':
            mood = 'a contempt'
            break;
        default:
            mood = 'a happy'
    }

    const age = user.age;
    const gender = user.gender;
    const photo = user.photoUrl;

    function resultPage() {
        props.navigation.navigate('Result');
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.detection}>
                <View style={styles.result_photo_container}>
                    <Image source={{ uri: photo }} style={styles.result_photo} />
                </View>
                <View style={styles.result_description_container} >
                    <Text style={styles.result_description_header}>Hi There!</Text>
                    <Text style={styles.result_description}>You look like a <Text style={styles.highlited_text}> {
                        age} years old {gender} </Text></Text>
                    <Text style={styles.result_description}>It seems you are in <Text style={styles.highlited_text}> {mood} mood </Text></Text>
                    <View style={styles.circle_container}>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                    </View>
                    <Text style={styles.result_description}>Press 'See recommendation' button below to see food recommendations based on your mood!</Text>
                </View>
                <View style={styles.redirect_container}>
                    <TouchableOpacity onPress={() => resultPage()}>
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: "https://img.icons8.com/material-rounded/96/000000/star.png" }} />
                            <Text style={styles.result_description}>See Recommendation</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: 'https://img.icons8.com/metro/52/000000/camera.png' }} />
                            <Text style={styles.result_description}>Retake</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )

}

const primaryColor = '#f0c869';
const darkColor = '#333';
const cardRadius = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    detection: {
        width: '100%',
        height: '85%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    result_description_container: {
        marginTop: 30,
        alignItems: 'flex-start',
        alignItems: 'center',
        width: '80%'
    },
    result_description: {
        color: darkColor,
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10,
        textAlign: 'center',
        marginTop: 2
    },
    result_description_header: {
        color: darkColor,
        fontSize: 30,
        fontWeight: 'bold',
        paddingRight: 10,
        textAlign: 'center',
        paddingTop: 5
    },
    result_photo: {
        height: 160,
        width: 160,
        borderRadius: 100,
        borderColor: primaryColor,
        borderWidth: 5,
        marginTop: -70
    },
    redirect_container: {
        // backgroundColor: 'red',
        height: '30%',
        justifyContent: 'flex-end'
    },
    image_button: {
        height: 25,
        width: 25,
        tintColor: 'white',
        marginRight: 10
    },
    redirect_favorite: {
        flexDirection: 'row',
        borderRadius: 100,
        backgroundColor: primaryColor,
        width: '85%',
        marginBottom: 10,
        paddingHorizontal: 5,
        width: 250,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    highlited_text: {
        color: darkColor,
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10,
        backgroundColor: primaryColor,
        marginHorizontal: 5,
    },
    circle: {
        width: 20,
        height: 20,
        backgroundColor: primaryColor,
        borderRadius: 100,
        marginRight: 5
    },
    circle_container: {
        flexDirection: 'row',
        marginVertical: 20
    }
})