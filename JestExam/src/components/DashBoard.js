import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import { updateProductList } from '../redux/Action';
import { requestUserPermission, notificationListner } from '../utils/NotificationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { productsData } from '../utils/ProductsData';



const DashBoard = ({ navigation }) => {

    const [refreshing, setSefreshing] = useState(false);

    const data = useSelector((state) => state.mainReducer);
    const dispatch = useDispatch();



    useEffect(() => {
        requestUserPermission();
        notificationListner();

        // dispatch product data
        dispatch(updateProductList(productsData));

    }, [])

    const onLogoutClickListner = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User sign out');
                navigation.replace('Login')
            })
            .catch(error => {
                console.error(error);
            });
    }
    const onrefresh = () => {
        setSefreshing(true);
        setTimeout(() => {
            setSefreshing(false);
        }, 3000)
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={styles.headerTopViewStyle}>
                    <Image
                        source={require('../assets/images/laptop_logo.jpeg')}
                        style={{ width: 40, height: 40, margin: 5 }}
                    />
                    <Text style={styles.homeTextStyle}>Home</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={onLogoutClickListner}
                            style={styles.CartImgBckStyle}>
                            <Icon name="logout" size={24} style={{ padding: 4, alignSelf: 'center' }} />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>



            <FlatList
                data={data.productList}
                renderItem={({ item }) => (
                    <ProductItem product={item} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onrefresh}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 12,
        paddingTop: Platform.OS === 'ios' ? 40 : 0
    },
    headerTopViewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    CartImgBckStyle: {
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 35,
        width: 35
    },
    homeTextStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2Text: {
        fontSize: 25,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default DashBoard;