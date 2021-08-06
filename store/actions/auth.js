export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
            throw new Error('Something went wrong!');
        }

        const json = await res.json();
        console.log(json);

        dispatch({ type: SIGNUP });
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
            throw new Error('Something went wrong!');
        }

        const json = await res.json();
        console.log(json);

        dispatch({ type: LOGIN });
    };
};
