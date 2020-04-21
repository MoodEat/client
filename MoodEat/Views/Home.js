import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Layout, Button, } from '@ui-kitten/components';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LATITUDE, SET_LONGITUDE } from '../stores/actions/userAction';
import allActions from '../stores/actions';

export default function Home(props) {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (location) {
        dispatch(SET_LATITUDE(location.coords.latitude))
        dispatch(SET_LONGITUDE(location.coords.longitude))
    }

    function goUploadScreen() {
        props.navigation.navigate('Upload');
    }

    function favoritePage() {
        dispatch(allActions.fetchFavorite(token));
        props.navigation.navigate(
            'Favorite',
            { 'token': token }
        );
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/home.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.bottom}>
                <View style={styles.redirect_container}>
                    <TouchableOpacity onPress={goUploadScreen}>
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: 'https://img.icons8.com/metro/52/000000/camera.png' }} />
                            <Text style={styles.result_description}>Take Mood</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => favoritePage()} >
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: "https://img.icons8.com/material-rounded/96/000000/star.png" }} />
                            <Text style={styles.result_description}>Favorite</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    top: {
        flex: 4,
        width: '100%'
    },
    bottom: {
        flex: 2,
        backgroundColor: '#f0c869',
        textDecorationColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopRightRadius: 70,
        borderTopLeftRadius: 70,
        flexDirection: 'column'
    },
    button: {
        margin: 2,
        borderRadius: 90,
        height: 100,
        width: 150
    },
    redirect_container: {
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    redirect_favorite: {
        flexDirection: 'row',
        borderRadius: 100,
        backgroundColor: 'white',
        width: '85%',
        marginBottom: 10,
        paddingHorizontal: 5,
        width: 250,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image_button: {
        height: 25,
        width: 25,
        tintColor: primaryColor,
        marginRight: 10
    },
    result_description: {
        color: darkColor,
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10,
        textAlign: 'center',
    },
});