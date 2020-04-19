import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Layout, Text, Button,  } from '@ui-kitten/components';
export default function Home(props){
    const user = useSelector(state => state.user)

    return (
        <Layout style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/home.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.bottom}>
                <Text>Halo Home</Text>
                <Text>{JSON.stringify(user)}</Text>
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