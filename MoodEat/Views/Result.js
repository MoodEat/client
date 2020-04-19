import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, Button, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import allActions from '../stores/actions';

export default function Result(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const user = useSelector((state) => state.user);
    const mood = user.mood;
    const photo = user.photoUrl;

    const category = useSelector((state) => state.category);
    const recommendation = category.recommendation;

    console.log('=================================');
    console.log('mood:', mood);
    console.log('=================================');

    useEffect(() => {
        console.log('masuk use effect');
        dispatch(allActions.fetchRecommendation(mood));
    }, [dispatch])

    function handleClick(food) {
        console.log(`masuk handle click webview`);
        props.navigation.navigate(
            'WebViewTest',
            { food }
        );
    }

    function Card({ card }) {
        const image = card.image;
        const food = card.food;

        return (
            <View style={styles.card_container}>
                <Image source={{ uri: image }} style={styles.card_image} />
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description}>
                        {food}
                    </Text>
                    <TouchableOpacity onPress={handleClick(food)}>
                        <Text style={styles.button}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function recommendation_page() {
        props.navigation.navigate('Recommendation');
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.top_result}>
                <View style={styles.result_photo_container}>
                    <Image source={{ uri: photo }} style={styles.result_photo} />
                </View>
                <View style={styles.result_description_container} >
                    <Text style={styles.result_description}>Hi There!</Text>
                    <Text style={styles.result_description}>Based on your photo</Text>
                    <Text style={styles.result_description}>We see a lot of</Text>
                    <Text style={styles.result_description_name}>{mood}!</Text>
                    <TouchableOpacity onPress={recommendation_page}>
                        <Text style={styles.button}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottom_result}>
                {/* <Text style={styles.recommendation_heading}>
                    Foods We Recommend
                </Text> */}
                <View style={styles.scroll_container}>
                    <FlatList
                        data={recommendation}
                        renderItem={({ item, index }) => <Card card={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Layout>
    )
}

const primaryColor = '#f0c869';
const darkColor = '#333';
const cardRadius = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    top_result: {
        flex: 2.5,
        width: '100%',
        alignItems: 'center',
        paddingLeft: 15,
        flexDirection: 'row'
    },
    result_photo: {
        height: 160,
        width: 160,
        borderRadius: 100
    },
    result_description: {
        color: darkColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    result_description_name: {
        color: darkColor,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: primaryColor,
        borderRadius: 20,
        textAlign: 'center'
    },
    result_description_container: {
        flexDirection: 'column',
        marginLeft: 20,
        height: '100%',
        justifyContent: 'center',
    },
    result_photo_container: {
        borderRadius: 100,
        borderColor: primaryColor,
        borderWidth: 5,
        padding: 5,
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom_result: {
        flex: 4,
        backgroundColor: primaryColor,
        textDecorationColor: '#000',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        elevation: 1,
        paddingTop: '10%'
    },
    recommendation_heading: {
        borderRadius: 100,
        backgroundColor: 'white',
        color: darkColor,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        fontSize: 20
    },
    card_container: {
        height: 190,
        backgroundColor: 'white',
        marginTop: '5%',
        width: 300,
        borderRadius: cardRadius,
        marginHorizontal: 20,

    },
    card_image: {
        width: 300,
        height: 190,
        borderRadius: cardRadius,
        borderColor: 'white',
        borderWidth: 2
    },
    card_description_container: {
        height: 190,
        width: '50%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        borderRadius: cardRadius,
        borderTopRightRadius: 80,
        borderBottomRightRadius: 80,
        alignItems: 'center'
    },
    card_description: {
        color: darkColor,
        fontWeight: 'bold',
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
        paddingHorizontal: 15,
        textAlign: 'center'
    }
});