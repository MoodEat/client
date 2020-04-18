import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Layout, Text, Button,  } from '@ui-kitten/components';
export default function Home(props){


    function goUploadScreen(){
        props.navigation.navigate('Upload');
    }

    function goResultScreen() {
        console.log('masuk button result screen');
        props.navigation.navigate('Result');
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.top}>
                <Text>Halo Home</Text>
                <Image source={require('../assets/home.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.bottom}>
                <Button style={styles.button} status='basic' onPress={goUploadScreen} >Take Mood</Button>
                <Button style={styles.button} status='basic' onPress={goResultScreen} >Result</Button>
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
        elevation: 1000
    },
    button: {
        margin: 2,
        borderRadius: 100
    }
});