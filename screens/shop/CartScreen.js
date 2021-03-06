import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    AcitivityIndicator,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotal = useSelector((state) => state.cart.total);
    const cartItems = useSelector((state) => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotal));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>
                        ${Math.round(cartTotal.toFixed(2) * 100) / 100}
                    </Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                    <Button
                        title="Order Now"
                        color={Colors.primary}
                        disabled={!cartItems || cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                )}
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum.toFixed(2)}
                        deletable
                        onRemove={() => {
                            dispatch(
                                cartActions.removeFromCart(
                                    itemData.item.productId
                                )
                            );
                        }}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.accent,
    },
});

export default CartScreen;
