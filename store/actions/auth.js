import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
    return {
        type: AUTHENTICATE,
        userId: userId,
        token: token,
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        const res = fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={key}',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!res.ok) {
            const errorResData = await res.json();
            const errorId = errorResData.error.message;

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already.';
            }

            throw new Error(message);
        }

        dispatch(authenticate(resData.localId, resData.idToken));

        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );

        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const res = fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={key}',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!res.ok) {
            const errorResData = await res.json();
            const errorId = errorResData.error.message;

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email was not found.';
            } else if (errorId === 'INPUT_PASSWORD') {
                message = 'This password is not valid.';
            }

            throw new Error(message);
        }

        dispatch(authenticate(resData.localId, resData.idToken));

        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );

        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
        })
    );
};
