import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Button,
} from 'react-native';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
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
                    errorMessage="Please enter a valid email address"
                    onInputChange={() => {}}
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
                    errorMessage="Please enter a valid password address"
                    onInputChange={() => {}}
                    initialValue=""
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        color={Colors.primary}
                        onPress={() => {}}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        color={Colors.accent}
                        onPress={() => {}}
                    />
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
