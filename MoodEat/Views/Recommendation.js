import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import allActions from '../stores/actions';
import Loading from '../components/Loading'



const FavIcon = (props) => (
  <Icon {...props} name='heart'/>
);


export default function Recommendation(props) {
    const dispatch = useDispatch()
    const restaurant = useSelector((state) => state.restaurant.restaurants);

    const loading = useSelector((state) => state.restaurant.loadingRest);
    const token = useSelector((state) => state.user.token);
    
    function handleClick(url) {
        props.navigation.navigate(
            'Detail',
            { 'url': url }
        );
    }

    function handleAddFavorite(id) {

        console.log('=================================');
        console.log('restaurant id di recommendation:', id);
        console.log('=================================');
        console.log('user token:', token);
        console.log('=================================');

        dispatch(allActions.addFavorite(id, token));
    }

    console.log('=================================')
    console.log('state favorite:', useSelector((state) => state.favorite.favorite))
    console.log('state favorite:', useSelector((state) => state.restaurant))
    console.log('=================================')

    

    function Card({ card }) {
        let image = card.photo_url;
        const name = card.name;
        const url = card.url;
        const id = card.idRestaurant;

        if (image == '') {
            image = 'https://i.imgur.com/0jEmiwl.jpg'
        }
        let userToken
        const checkToken = async () => {
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }
            if (userToken) {
                // dispatch(allActions.SET_ISLOGIN(true));
                console.log(userToken, 'masuuuuk');
            }
        }

        return (
            <View style={styles.card_container}>
                    <TouchableOpacity onPress={() => handleClick(url)}>
                        {/* <Text style={styles.button}>Details</Text> */}
                        <Image source={{ uri: image }} style={styles.card_image} />
                    </TouchableOpacity>
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description}>
                        {name}
                    </Text>
                    <Button 
                    appearance='ghost'
                    status = 'basic'
                    accessoryLeft={FavIcon}
                    onPress={() => handleAddFavorite(id)}
                    />
                </View>
            </View>
        )
    }

    if (loading) {
        return (
           <Loading />
        )
    } else if (restaurant.length == 0) {
        return (
            <Text style={styles.card_description}>
                There is no restaurant on your nearby location
            </Text>
        )
    } else {
        return (
            <Layout style={styles.container}>
                <View style={styles.bottom_result}>
                    <Text style={styles.recommendation_heading}>Restaurant Nearby</Text>
                    <FlatList
                        data={restaurant}
                        renderItem={({ item, index }) => <Card card={item} />}
                        keyExtractor={item => item.idRestaurant}
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