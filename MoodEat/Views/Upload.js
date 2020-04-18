import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
export default function Home(props) {

    function goCameraScreen() {
        props.navigation.navigate('Camera');
    }
    return (
        <Layout style={styles.container}>
            <View style={styles.bottom}>
                <Button style={styles.button} status='basic' onPress={goCameraScreen} > Take Picture</Button>
                <Button style={styles.button} status='basic' > From Gallery</Button>
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
        width: '100%'
    },
    top: {
        flex: 4,
        backgroundColor: 'red',
        width: '90%'
    },
    bottom: {
        flex: 2,
        backgroundColor: '#f0c869',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    button: {
        margin: 2,
        borderRadius: 100
    }
});