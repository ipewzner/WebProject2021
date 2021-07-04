import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';

export default (cart = {}, action) => {
    switch (action.type) {
        case FETCH_ALL: {
            return action.payload;
        }
        default:
            return cart;
    }
}