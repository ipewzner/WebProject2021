import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import users from './users';
import products from './product';
export default combineReducers({
    posts,
    auth,
    users,
    products,
});