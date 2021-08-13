import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://shopping-app-b757b-default-rtdb.firebaseio.com/orders/${userId}.json`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await response.json();
            const loadedOrders = [];

            for (const key in json) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].total,
                        new Date(resData[key].date)
                    )
                );
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};

export const addOrder = (cartItems, total) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(
            `https://shopping-app-b757b-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    total,
                    date: date.toISOString(),
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const json = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: json.name,
                items: cartItems,
                amount: total,
                date: date,
            },
        });
    };
};
