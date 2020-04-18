import React, { useState, useEffect, useRef} from 'react';
import { Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
    const camRef = useRef(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(null)

    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmhfoypma/image/upload';

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
        // base64: true
      })
    //   let base64Img = `data:image/jpg;base64,${picResult.base64}`;
      setPhoto(picResult.uri)
      console.log('picresult---------', picResult);
    //   let data = {
    //     "file": base64Img,
    //     "upload_preset": "wlp7zivu",
    //   }
      // console.log(data);
    //   fetch(CLOUDINARY_URL,{
    //     body: JSON.stringify(data),
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     method: 'POST'
    //   }).then(async r => {
    //       let result = await r.json()
    //       console.log(result,'ini resuiuuuuuult');
    //       console.log('---------------------------------------------');
    //       console.log(result.info.detection.adv_face.data,'data ---------------');
          
          
    //   }).catch(err => console.log(err))
      
    }
  }

  if (photo !== null) {
    return (
        <View>
            <Image source={{uri: photo}} style={{ width: "100%", height: "100%" }} />
        </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef} autoFocus={'on'}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
              flex: 0.8,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }} onPress={ takePicture } >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );

}