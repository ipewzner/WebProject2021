import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import products from './product';

export default combineReducers({
    posts,
    auth,
    products
});