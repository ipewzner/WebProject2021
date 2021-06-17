import {CREATE,UPDATE,DELETE ,FETCH_ALL} from '../constants/actionTypes';

export default (prodect = [], action) => {
    switch (action.type) {
        case DELETE:
            return prodect.filter((prodect) => prodect._id != action.payload);
        case UPDATE:
            return prodect.map((prodect) => prodect._id == action.payload._id ? action.payload : prodect);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...prodect, action.payload];
        default:
            return prodect;
    }
}