import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
import allActions from './stores/actions/index'
import HomeScreen from './Views/Home';
import UploadScreen from './Views/Upload';
import CameraScreen from './Views/Camera';
import ResultScreen from './Views/Result';
import RecommendationScreen from './Views/Recommendation';
import Detail from './Views/Detail';
import FavoriteScreen from './Views/Favorite' ;
import TesResultScreen from './Views/TesResult';
import LoginScreen from './Views/Login';
import RegisterScreen from './Views/Register';
import DetectionPage from './Views/Detection';

const Stack = createStackNavigator();

export default function Index() {
    const user = useSelector((state) => state.user)
    const isLogin = user.isLogin
    console.log(user);
    
    React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      if (userToken){
          dispatch(allActions.SET_ISLOGIN(true));
          console.log(userToken,'masuuuuk');
      }
    
    };

    bootstrapAsync();
  }, []);

  return (
    <>
        <NavigationContainer>
            <Stack.Navigator>
                {
                isLogin === false ? (
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Upload" component={UploadScreen} />
                    <Stack.Screen name="Camera" component={CameraScreen} />
                    <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Recommendation" component={RecommendationScreen} />
                    <Stack.Screen name="Detail" component={Detail} />
                    <Stack.Screen name="TesResult" component={TesResultScreen} />
                    <Stack.Screen name="Favorite" component={FavoriteScreen} />
                    <Stack.Screen name="Detection" component={DetectionPage} />
                    </>
                )
                }
            </Stack.Navigator>
        </NavigationContainer>
    </>
);
};
