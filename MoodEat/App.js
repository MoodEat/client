import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeScreen from './Views/Home';
import UploadScreen from './Views/Upload';
import CameraScreen from './Views/Camera';
import GalleryScreen from './Views/Gallery';
import ResultScreen from './Views/Result';
import RecommendationScreen from './Views/Recommendation';
import { Provider } from 'react-redux';
import store from './stores/store';
import WebViewTest from './Views/WebView';

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
              <Stack.Screen name="Gallery" component={GalleryScreen} />
              <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Recommendation" component={RecommendationScreen} />
              <Stack.Screen name="WebViewTest" component={WebViewTest} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
}