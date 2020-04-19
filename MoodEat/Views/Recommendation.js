import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, Button, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

export default function Recommendation(props) {

    const restaurant = useSelector((state) => state.restaurant);

    console.log('===================');
    console.log('restaurant:', restaurant);
    console.log('===================');

    function handleClick(url) {
        props.navigation.navigate(
            'WebViewTest',
            { url }
        );
    }
    
    function Card({ card }) {
        const image = card.photo_url;
        const name = card.name;

        return (
            <View style={styles.card_container}>
                <Image source={{ uri: image }} style={styles.card_image} />
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description}>
                        {name}
                    </Text>
                    <TouchableOpacity onPress={handleClick(url)}>
                        <Text style={styles.button}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <Layout style={styles.container}>
            <Text style={styles.recommendation_heading}>Restaurant Nearby</Text>
            <FlatList
                        data={restaurant}
                        renderItem={({ item, index }) => <Card card={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
        </Layout>
    )
}

const primaryColor = '#f0c869';
const darkColor = '#333';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20
    },
    recommendation_heading: {
        borderRadius: 100,
        backgroundColor: 'white',
        color: darkColor,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    card_container: {
        height: 200,
        backgroundColor: 'white',
        marginTop: '5%',
        width: 300,
        borderRadius: 10,
    },
    card_image: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    card_description_container: {
        height: 190,
        width: '50%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        borderRadius: 10,

    },
    card_description: {
        color: darkColor,
        fontWeight: 'bold',
    },
    card_description_address: {
        color: darkColor,
    },
    scroll_container: {
        width: '85%',
        alignItems: 'center'
    },
    button: {
        marginLeft: 10,
        backgroundColor: primaryColor,
        color: 'white',
        borderColor: primaryColor,
        borderWidth: 1,
        borderRadius: 10,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});