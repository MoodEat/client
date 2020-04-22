import React, { useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../stores/actions/index'
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Layout, Button, Icon } from '@ui-kitten/components';
import Loading from '../components/Loading'

const CameraIcon = (props) => (
  <Icon {...props} name='camera'/>
);
const FlipIcon = (props) => (
  <Icon {...props} name='flip-2'/>
)
export default function CameraScreen(props) {
  const dispatch = useDispatch()
    const camRef = useRef(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(null)
    const [isLoading, setLoading] = useState(false)

    
    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/do77uifoc/image/upload';

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture(){
    if (camRef) {
      const picResult = await camRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true
      })
      setPhoto(picResult)
    }
  }

  function deletePhoto() {
    setPhoto(null)
  }

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
              props.navigation.navigate('Upload');
              return
            } else if (result.info.detection.adv_face.data === undefined){
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
                    <Button style={styles.button} status='basic' onPress={deletePhoto}>Cancel</Button>
                </View>
            </Layout>
        )
    }

  return (
      <Camera style={{ flex: 1 }} type={type} ref={camRef} autoFocus={'on'}>
      <View style={styles.bottomCamera}>
        <Button style={styles.buttonCamera} 
          appearance='ghost'
          status = 'basic'
          accessoryLeft={CameraIcon}  
          onPress={takePicture} />
        <Button style={styles.buttonCamera}
          appearance='ghost'
          status='basic'
          accessoryLeft={FlipIcon}
          onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}/>
      </View>
      </Camera>
  );

}


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
    bottomCamera: {
      flex: 1,
      backgroundColor: 'transparent',
      textDecorationColor: '#000',
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    button: {
        margin: 10,
        borderRadius: 100,
        height: 70,
        width: 150,
        backgroundColor: '#f0c869'
    },
    buttonCamera: {
      margin: 20,
      borderRadius: 100,
      height: 70,
      width: 70,
      borderColor: '#f0c869',
      marginBottom: 50
    }
});