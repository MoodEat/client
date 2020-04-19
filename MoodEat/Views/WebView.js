import React from 'react';
import { WebView } from 'react-native-webview';

export default function WebViewTest() {

    return (
        <WebView
            source={{ uri: 'https://reactjs.org/' }}
        />
    )

} 