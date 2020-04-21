import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import allActions from '../stores/actions';
import Loading from '../components/Loading'
import MapView, { Callout } from 'react-native-maps';



const FavIcon = (props) => (
    <Icon {...props} name='heart' />
);


export default function Recommendation(props) {
    const dispatch = useDispatch()
    const restaurant = useSelector((state) => state.restaurant.restaurants);
    const [mapsView, setMapsView] = useState(false)
    const loading = useSelector((state) => state.restaurant.loadingRest);
    const user = useSelector((state) => state.user);
    const token = user.token
    const userLat = user.latitude
    const userLot = user.longitude
    const markers = restaurant

    const userCoord = {
        latitude: Number(userLat),
        longitude: Number(userLot),
    }

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
        const location = card.location.locality

        if (image == '') {
            image = 'https://i.imgur.com/h6TdPga.jpg'
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
                    <Image source={{ uri: image }} style={styles.card_image} />
                </TouchableOpacity>
                <View style={styles.card_description_container}>
                    <Text style={styles.card_description_heading}>
                        {name}
                    </Text>
                    <Text style={styles.card_description}>
                        {location}
                    </Text>
                    <TouchableOpacity onPress={() => handleAddFavorite(id)} style={styles.image_button_container}>
                    <Image source={{ uri: 'https://img.icons8.com/ios-filled/90/000000/like.png' }}  style={styles.image_button}/>
                </TouchableOpacity>
                </View>
                
            </View>
        )
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    if (restaurant.length == 0) {
        return (
            <View style={styles.empty_container}>
                <Text style={styles.empty_description}>
                    Woops! There is no restaurant on your nearby location
                </Text>
                <Image style={styles.empty_image} source={{ uri: "https://img.icons8.com/ios/96/000000/sad-cloud.png" }} />
            </View >
        )
    }

    if (mapsView) {
        return (
            <View style={styles.mapsContainer}>
            <Button onPress={() => setMapsView(false)}>List View</Button>
             <MapView style={styles.mapStyle} 
                    initialRegion={{
                    latitude: Number(userLat),
                    longitude: Number(userLot),
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09
                    }}>
                        
                <MapView.Marker
                coordinate={userCoord}
                title={'you'}
                image={require('../assets/home.png')}
                description={'you here'}
                >
                    
                </MapView.Marker>

                    { markers.map((marker, index) => {
                        const coords = {
                            latitude: Number(marker.location.latitude),
                            longitude: Number(marker.location.longitude),
                        };

                return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={marker.name}
                            image={require('../assets/pin-outline.png')}
                            description={marker.name}
                            // showCallout={true}
                            >
                            <Callout onPress = {() => handleClick(marker.url)}>
                            <View >
                                <Text style={{color: darkColor}}>{marker.name}</Text>
                                <Text style={{color: darkColor}}>{marker.location.locality}</Text>
                            </View>
                            </Callout>
                            </MapView.Marker>
                        
                    );
            })}
                </MapView>
            </View>
                )
    }
    return (
        <Layout style={styles.container}>
            <View style={styles.bottom_result}>
                <Text style={styles.recommendation_heading}>Restaurant Nearby</Text>
                <Button onPress={() => setMapsView(true)}>Maps View</Button>
                <FlatList
                    data={restaurant}
                    renderItem={({ item, index }) => <Card card={item} />}
                    keyExtractor={item => item.idRestaurant}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Layout>
    )

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
    card_description: {
        color: darkColor,
        paddingHorizontal: 10
        // fontWeight: 'bold',
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
        height: 30,
        width: 30,
        tintColor: primaryColor,
        zIndex: 5,
    },
    image_button_container: {
        width: '100%',
        alignItems: 'flex-end'
    },
    mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});