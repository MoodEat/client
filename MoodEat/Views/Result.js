import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import allActions from '../stores/actions';

export default function Result(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const token = useSelector((state) => state.user.token);

    const user = useSelector((state) => state.user);
    const mood = user.mood;
    const age = user.age;
    const gender = user.gender;
    const photo = user.photoUrl;
    const latitude = user.latitude;
    const longitude = user.longitude;

    const category = useSelector((state) => state.category);
    const recommendation = category.recommendation;
    useEffect(() => {
        dispatch(allActions.fetchRecommendation(mood));
    }, [dispatch])

    function handleClick(food) {

        let payload = {
            food,
            latitude,
            longitude
        }
        dispatch(allActions.fetchRestaurant(payload))
        console.log(`masuk handle click webview`);
        props.navigation.navigate(
            'Recommendation',
        );
    }

    function Card({ card }) {
        let image = card.image;
        const food = card.food;

        if (image == '') {
            image = 'https://i.imgur.com/h6TdPga.jpg'
        }

        return (
            <View style={styles.card_container}>
                <Image source={{ uri: image }} style={styles.card_image} />
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description}>
                        {food}
                    </Text>
                    <TouchableOpacity onPress={() => handleClick(food)}>
                        <Text style={styles.button}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function favoritePage() {
        props.navigation.navigate(
            'Favorite',
            { 'token': token }
        )
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.top_result}>

                <View style={styles.result_photo_container}>
                    <Image source={{ uri: photo }} style={styles.result_photo} />
                </View>
                <View style={styles.result_description_container} >
                    <Text style={styles.result_description}>Gender: {gender}</Text>
                    <Text style={styles.result_description}>Age: {age}</Text>
                    <Text style={styles.result_description}>Your Mood: {mood}</Text>
                    <View style={styles.redirect_container}>
                        <TouchableOpacity onPress={() => favoritePage()}>
                            <View style={styles.redirect_favorite}>
                                <Image style={styles.image_button} resizeMode="contain" source={{ uri: "https://img.icons8.com/ios-filled/90/000000/like.png" }} />
                                <Text style={styles.result_description}>Favorite</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                            <View style={styles.redirect_favorite}>
                                <Image style={styles.image_button} resizeMode="contain" source={{ uri: 'https://img.icons8.com/material-rounded/104/000000/home.png' }} />
                                <Text style={styles.result_description}>Home</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>

                </View>
            </View>
            <View style={styles.bottom_result}>
                <View style={styles.scroll_container}>
                    <FlatList
                        data={recommendation}
                        renderItem={({ item, index }) => <Card card={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
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
    layoutTop: {
        backgroundColor: primaryColor,
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
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 5
    },
    result_description: {
        color: darkColor,
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10
    },
    result_description_name: {
        color: darkColor,
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 20,
        textAlign: 'center'
    },
    result_description_container: {
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 5,
        height: '61%',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40
    },
    result_photo_container: {
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        padding: 5,
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90
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
    },
    redirect_container: {
        marginTop: 10,
    },
    image_button: {
        height: 25,
        width: 25,
        tintColor: primaryColor,
        borderRadius: 100,
        padding: 10,
        marginRight: 10
    },
    redirect_favorite: {
        flexDirection: 'row',
        borderRadius: 100,
        backgroundColor: 'white',
        width: '85%',
        marginBottom: 10,
        paddingHorizontal: 5
    }
});