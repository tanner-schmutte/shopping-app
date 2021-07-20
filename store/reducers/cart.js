import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    total: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let newOrUpdateCartItem;

            if (state.items[addedProduct.id]) {
                // already have the item in the cartItem
                newOrUpdateCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                newOrUpdateCartItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: newOrUpdateCartItem,
                },
                total: state.total + prodPrice,
            };

        case REMOVE_FROM_CART:
            const { quantity, productPrice, productTitle, sum } =
                state.items[action.pid];

            let updatedCartItem;

            if (quantity > 1) {
                const decrement = new CartItem(
                    quantity - 1,
                    productPrice,
                    productTitle,
                    sum - productPrice
                );
                updatedCartItem = { ...state.items, [action.pid]: decrement };
            } else {
                updatedCartItem = { ...state.items };
                delete updatedCartItem[action.pid];
            }
            return {
                ...state,
                items: updatedCartItem,
                total: state.total - productPrice,
            };
    }
    return state;
};
