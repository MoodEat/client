import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import HomeScreen from './Views/Home';
import UploadScreen from './Views/Upload';
import CameraScreen from './Views/Camera';
import ResultScreen from './Views/Result';
import RecommendationScreen from './Views/Recommendation';
import Detail from './Views/Detail';
import FavoriteScreen from './Views/Favorite' ;
import TesResultScreen from './Views/TesResult';
import store from './stores/store';

const Stack = createStackNavigator();


export default function App() {
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Upload" component={UploadScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Recommendation" component={RecommendationScreen} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="TesResult" component={TesResultScreen} />
              <Stack.Screen name="Favorite" component={FavoriteScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
};