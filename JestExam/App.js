import React from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import {Store} from "./src/redux/Store";
import Splash from './src/components/Splash';
import Login from './src/components/Login';
import ProductItem from "./src/components/ProductItem";
import DashBoard from "./src/components/DashBoard";

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} >
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ProductItem" component={ProductItem} />
                    <Stack.Screen name="DashBoard" component={DashBoard} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
})
export default App;