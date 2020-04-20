import 'react-native-get-random-values';
import React from 'react';
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

export default function WebViewTest(props) {

    const url = props.route.params.url
    // console.log(url);
    

    return (
        <>
        {/* <Text>{JSON.stringify(url)}</Text> */}
            <WebView
                source={{ uri: url }}
            />
        </>

    )

} 