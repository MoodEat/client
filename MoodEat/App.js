import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import HomeScreen from './Views/Home';
import UploadScreen from './Views/Upload';
import CameraScreen from './Views/Camera';
import ResultScreen from './Views/Result';
import RecommendationScreen from './Views/Recommendation';
const Stack = createStackNavigator();


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Result" component={ResultScreen} options={{headerShown: false}} />
          <Stack.Screen name="Recommendation" component={RecommendationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}


