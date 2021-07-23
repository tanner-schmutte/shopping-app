import React, { useEffect, useCallback, useRef, useReducer } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        };
    }
    return state;
};

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');

    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    });

    const imageUrlRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input.', 'Please check the errors in the form', [
                { text: 'Okay' },
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }

        dispatchFormState({
            type: FORM_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier,
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            imageUrlRef.current.focus();
                        }}
                    ></TextInput>
                </View>
                {!formState.inputValidities.title && (
                    <Text>Please enter a valid title!</Text>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
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
                            value={formState.inputValues.price}
                            keyboardType="decimal-pad"
                            onChangeText={textChangeHandler.bind(this, 'price')}
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
                        value={formState.inputValues.description}
                        ref={descriptionRef}
                        onChangeText={textChangeHandler.bind(
                            this,
                            'description'
                        )}
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
