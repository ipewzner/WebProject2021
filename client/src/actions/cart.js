import axios from 'axios'
import {
    FETCH_ALL
} from '../constants/actionTypes'
import * as api from '../api';

export const getCartProducts = (user) => async (dispatch) => {
    try {
        const { data } = await api.fetchCartProducts(user);
        dispatch({ type: FETCH_ALL, payload: data });
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
    
    // const { data } = await axios.get(`/api/products/${id}`)

    // dispatch({
    //     payload: {
    //         product: data._id,
    //         name: data.name,
    //         image: data.image,
    //         price: data.price,
    //         countInStock: data.countInStock,
    //         qty,
    //     },
    // })

    //localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
