import 'react-native-get-random-values';
import React from 'react';
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

export default function WebViewTest(props) {

    console.log(props.route.params.url);
    
    return (
            <WebView
                source={{ uri: url }}
            />

    )

} 