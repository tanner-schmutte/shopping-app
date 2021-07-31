export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, total) => {
    return async (dispatch) => {
        const date = new Date();
        const response = await fetch(
            'https://shopping-app-b757b-default-rtdb.firebaseio.com/orders/u1.json',
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
