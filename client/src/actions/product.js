import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getProducts = () => async (dispatch) => {
    try {
        console.log("calling to api for products");
        const { data } = await api.fetchProducts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);
        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err);
    }
}

export const likeProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeProduct(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}