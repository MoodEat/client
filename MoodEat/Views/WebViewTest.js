import 'react-native-get-random-values';
import React from 'react';
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

export default function WebViewTest() {

    return (
            <WebView
                source={{ uri: 'https://egghead.io/lessons/react-native-open-a-webpage-in-react-native-with-linking-and-webview' }}
            />

    )

} 