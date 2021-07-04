import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';

export default (products = [], action) => {
    switch (action.type) {
        case DELETE:
            return products.filter((product) => product._id != action.payload);
        case UPDATE:
            return products.map((product) => product._id == action.payload._id ? action.payload : product);
        case FETCH_ALL: {
            return action.payload;
        }
        case CREATE:
            return [...products, action.payload];
        default:
            return products;
    }
}