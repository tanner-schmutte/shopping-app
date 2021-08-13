import React, { useEffect, useState, useReducer, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authAction from '../../store/actions/auth';

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

const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred.', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authAction.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authAction.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <ScrollView style={styles.authContainer}>
                <Input
                    id="email"
                    label="E-mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <Input
                    id="password"
                    label="Password"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter a valid password address"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title={isSignUp ? 'Sign Up' : 'Login'}
                        color={Colors.primary}
                        onPress={authHandler}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {isLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={Colors.primary}
                        />
                    ) : (
                        <Button
                            title={`Switch to ${
                                isSignUp ? 'Login' : 'Sign Up'
                            }`}
                            color={Colors.accent}
                            onPress={() => {
                                setIsSignUp((prevState) => !prevState);
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate',
};

styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default AuthScreen;
