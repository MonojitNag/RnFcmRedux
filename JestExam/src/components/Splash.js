import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

const Splash = ({navigation}) => {

    setTimeout(() => {
        navigation.replace('Login')
    },3000)
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle='light-content'
                hidden={false}
                />
                <Image 
                    style={styles.imgStyle}
                    source={require('../assets/images/laptop_logo.jpeg')}
                    />
              <Text style={styles.textStyle}> Laptop </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imgStyle:{
        width:90,
        height:90,
        borderRadius:50,
        marginBottom:10
    },
    textStyle:{
        fontSize:25,
        color:'black'
    }
})
export default Splash;