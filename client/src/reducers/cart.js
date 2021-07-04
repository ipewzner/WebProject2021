import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';

export default (cart = {}, action) => {
    switch (action.type) {
        case FETCH_ALL: {
            localStorage.setItem('cart', JSON.stringify({ ...action?.data }));
            return action.payload;
        }
        case DELETE: {
            localStorage.setItem('cart', JSON.stringify({ ...action?.data }));
            return action.payload;
        }
        default:
            return cart;
    }
}