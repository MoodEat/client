import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, } from '@ui-kitten/components';
import Constants from 'expo-constants';
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
                <Button style={styles.button} status='basic' onPress={goUploadScreen} > Take Mood </Button>
                <Button style={styles.button} status='basic' onPress={() => favoritePage()} >Favorite Page</Button>
            </View>
        </Layout>
    )
}


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
    }
});