import React, {useState} from 'react';
import {useDispatch } from 'react-redux'
import allActions from '../stores/actions/index'
import { StyleSheet, View, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../components/Loading'


export default function Home(props) {
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState(null);
    const [visible, setVisible] = useState(false);

    const [isLoading, setLoading] = useState(false)
  
    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/do77uifoc/image/upload';
  
    function goCameraScreen() {
        props.navigation.navigate('Camera');
    }

    function deletePhoto() {
        setPhoto(null)
    }
    

    // pick image start function
    pickImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
        base64: true
        });
        if (!result.cancelled) {
            setPhoto(result)
        }
    } catch (E) {
        console.log(E);
    }
    };
    // pick image END function

    function getMood(emotionValue) {
        let max = Math.max(emotionValue.anger, emotionValue.contempt, emotionValue.disgust, emotionValue.fear, emotionValue.happiness, emotionValue.neutral, emotionValue.sadness, emotionValue.surprise)
        let emotions = [
                {"mood": "anger", "value": emotionValue.anger },
                {"mood": "contempt", "value": emotionValue.contempt },
                {"mood": "disgust", "value": emotionValue.disgust },
                {"mood": "fear", "value": emotionValue.fear },
                {"mood": "happiness", "value": emotionValue.happiness },
                {"mood": "neutral", "value": emotionValue.neutral },
                {"mood": "sadness", "value": emotionValue.sadness },
                {"mood": "surprise", "value": emotionValue.surprise}
            ]
        return emotions.find(emotion => emotion.value === max)
    }

    function uploadPhoto() {
        let base64Img = `data:image/jpg;base64,${photo.base64}`;
        let data = {
                "file": base64Img,
                "upload_preset": "sceysj5m",
            }
        setLoading(true)
        fetch(CLOUDINARY_URL,{
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(async r => {
            let result = await r.json()
            if (result.error) {
                Alert.alert(
                'Sorry ......',
                'Internal Server Error'
                );
                setPhoto(null)
                return
            } else if (result.info.detection.adv_face.data === undefined) {
                Alert.alert(
                            'Face is not detected',
                            'Please retake your face picture'
                );
            } else {
                let emotionValue = result.info.detection.adv_face.data[0].attributes.emotion
                let mood = getMood(emotionValue).mood
                let imageUrl = result.url
                let age = result.info.detection.adv_face.data[0].attributes.age
                let gender = result.info.detection.adv_face.data[0].attributes.gender
                let payload = {
                    imageUrl,
                    mood,
                    age,
                    gender
                }
                dispatch(allActions.SET_USER(payload))
                props.navigation.navigate('Detection');
            }
        })
        .catch(err => {
            console.log(err, 'ini error upload Gallery');
        })
        .finally(_=>{
            setLoading(false)
        })
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (photo !== null) {
        return (
            <Layout style={styles.container}>
                <View style={styles.top}>
                    <Image source={{uri: photo.uri}} style={{ width: "90%", height: "90%" }} />
                </View>
                <View style={styles.bottom}>
                    <Button style={styles.button} status='basic' onPress={uploadPhoto}>Analyze Mood</Button>
                    <Button style={styles.button} status='basic'  onPress={deletePhoto}>Cancel</Button>
                </View>
            </Layout>
        )
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.firstLayout}>
            <TouchableOpacity onPress={goCameraScreen}>
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: 'https://img.icons8.com/metro/52/000000/camera.png' }} />
                            <Text style={styles.result_description}>Take Picture</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage} >
                        <View style={styles.redirect_favorite}>
                            <Image style={styles.image_button} resizeMode="contain" source={{ uri: "https://img.icons8.com/ios-filled/96/000000/stack-of-photos.png" }} />
                            <Text style={styles.result_description}>From Gallery</Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: '#f0c869',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    top: {
        flex: 4,
        backgroundColor: '#f0c869',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 2,
        backgroundColor: '#fff',
        textDecorationColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopRightRadius: 70,
        borderTopLeftRadius: 70
    },
    firstLayout: {
        flex: 2,
        backgroundColor: '#f0c869',
        textDecorationColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        margin: 10,
        borderRadius: 100,
        height: 70,
        width: 150,
        backgroundColor: '#f0c869'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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