import axios from 'axios'
import {
    FETCH_ALL
} from '../constants/actionTypes'
import * as api from '../api';

export const getCartProducts = (user) => async (dispatch) => {
    try {
        const  {data}  = await api.fetchCartProducts(user);
        await dispatch({ type: FETCH_ALL, payload: data });
        console.log("cart is::::: \n" + data);
        localStorage.setItem('cart', data);
    } catch (err) {
        console.log(err);
    }
}

export const addToCart = (user, id) => {
    try {
        console.log("calling api with" + user + '\n' + id);
        api.addToCart(user,id);    
    } catch (error) {
        console.log(error);
    }
}

export const removeFromCart = (user, id) => {
    try {
        console.log("calling api with" + user + '\n' + id);
        api.removeFromCart(user,id);    
    } catch (error) {
        console.log(error);
    }
    // localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
