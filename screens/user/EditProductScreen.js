import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');

    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === prodId)
    );

    const [title, setTitle] = useState(
        editedProduct ? editedProduct.title : ''
    );
    const [imageUrl, setImageUrl] = useState(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ''
    );

    const dispatch = useDispatch();

    const imageUrlRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(
                    prodId,
                    title,
                    description,
                    imageUrl
                )
            );
        } else {
            dispatch(
                productActions.createProduct(
                    title,
                    description,
                    imageUrl,
                    +price
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            imageUrlRef.current.focus();
                        }}
                    ></TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        ref={imageUrlRef}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            priceRef.current.focus();
                        }}
                    ></TextInput>
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            keyboardType="decimal-pad"
                            onChangeText={(text) => setPrice(text)}
                            ref={priceRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                descriptionRef.current.focus();
                            }}
                        ></TextInput>
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        ref={descriptionRef}
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-checkmark"
                    onPress={submitFn}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;
