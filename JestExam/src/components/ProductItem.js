import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class Products extends React.Component {

    constructor(){
        super();
    }

    render() {
        const {name,price} = this.props.product;
        return (
            <View style={styles.container}>
                <View style={styles.h2View}>
                    <View style={styles.imgView}>
                        <Image
                            source={require('../assets/images/laptop_one.png')}
                            style={styles.imgStyle}
                        />
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.productTitleStyle}>{name}</Text>
                        <Text>Price: {price} </Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 16,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
    },
    h2View: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 5,
        borderRadius: 10,
    },
    imgView: {
        flex: 2
    },
    imgStyle: {
        width: 150,
        height: 120,
        resizeMode: 'stretch'
    },
    detailsView: {
        flex: 3,
        height: 120,
        marginLeft: 12
    },
    productTitleStyle: {
        fontSize: 22,
        marginBottom: 5
    }
})
export default Products;