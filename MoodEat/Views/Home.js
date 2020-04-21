import React,{useState, useEffect} from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Layout, Text, Button,  } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as Location from 'expo-location'
import {useDispatch, useSelector} from 'react-redux'
import {SET_LATITUDE, SET_LONGITUDE} from '../stores/actions/userAction'

export default function Home(props) {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    },[]);

    if (location) {
        dispatch(SET_LATITUDE(location.coords.latitude))
        dispatch(SET_LONGITUDE(location.coords.longitude))
    }

    function goUploadScreen(){
        props.navigation.navigate('Upload');
    }

    function goResultScreen() {
        console.log('masuk button result screen');
        props.navigation.navigate('WebViewTest');
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/home.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.bottom}>
                <Button style={styles.button} status='basic' onPress={goUploadScreen} > Take Mood </Button>
                {/* <Button style={styles.button} status='basic' onPress={goResultScreen} >Result</Button> */}
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
        borderTopLeftRadius: 70
    },
    button: {
        margin: 2,
        borderRadius: 100,
        height: 100,
        width: 80
    }
});