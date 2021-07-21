import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onViewDetail}>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={props.onViewDetail}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add To Cart"
                        onPress={props.onAddToCart}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    details: {
        alignItems: 'center',
        height: '20%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20,
    },
});

export default ProductItem;
