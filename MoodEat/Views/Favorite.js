import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import allActions from '../stores/actions';

const TrashIcon = (props) => (
    <Icon {...props} name='trash' />
);

export default function FavoriteScreen(props) {
    const dispatch = useDispatch();
    let favorite = useSelector((state) => state.favorite.favorite);
    let token = props.route.params.token

    useEffect(() => {
        dispatch(allActions.fetchFavorite(token));
    }, [dispatch]);

    function Card({ card }) {
        let image = card.photo_url;
        const name = card.name;
        const url = card.url;
        const id = card._id;

        if (image == '') {
            image = 'https://i.imgur.com/h6TdPga.jpg'
        }

        function handleClick(url) {
            props.navigation.navigate(
                'Detail',
                { 'url': url }
            );
        }

        function handleDelete() {
            dispatch(allActions.deleteFavorite(id, token));
        }

        return (
            <View style={styles.card_container}>
                <TouchableOpacity onPress={() => handleClick(url)}>
                    <Image source={{ uri: image }} style={styles.card_image} />
                </TouchableOpacity>
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description_heading}>
                        {name}
                    </Text>
                    <TouchableOpacity onPress={() => handleDelete(id)} style={styles.image_button_container}>
                    <Image source={{ uri: 'https://img.icons8.com/android/24/000000/delete.png' }}  style={styles.image_button}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (favorite.length == 0) {
        return (
            <View style={styles.empty_container}>
                <Text style={styles.empty_description}>
                    Woops!
                    There is no restaurant on your favorite list
                </Text>
                <Image style={styles.empty_image} source={{ uri: "https://img.icons8.com/ios/96/000000/sad-cloud.png" }}/>
            </View>
        )
    } else {
        return (
            <Layout style={styles.container}>
                <View style={styles.bottom_result}>
                    <Text style={styles.recommendation_heading}>Your Favorite Restaurants List</Text>
                    <FlatList
                        data={favorite}
                        renderItem={({ item, index }) => <Card card={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Layout>
        )
    }
}

const primaryColor = '#f0c869';
const darkColor = '#333';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        width: '100%',
        padding: 20,
        paddingBottom: 70,
    },
    empty_container: {
        flex: 1,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    empty_description: {
        color: darkColor,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    empty_image: {
        tintColor: 'white',
        width: 100,
        height: 100
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
        width: '100%',
        borderRadius: 10,
    },
    card_image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    card_description_container: {
        height: '70%',
        width: '60%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        bottom: 30,
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    card_description_heading: {
        color: darkColor,
        fontWeight: 'bold',
        backgroundColor: primaryColor,
        borderRadius: 100,
        // borderWidth: 
        paddingHorizontal: 10
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
    },
    image_button: {
        height: 25,
        width: 25,
        tintColor: primaryColor,
        zIndex: 5,
        marginTop: 20
    },
    image_button_container: {
        width: '100%',
        alignItems: 'flex-end'
    }
});
