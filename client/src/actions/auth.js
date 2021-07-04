import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = formData.myAuth=='myAuth' ?
            await api.signin(formData.formData) :
            await api.signinByToken(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) { console.log(err); }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) { console.log(err); }
}

export const forgetPassword = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.forgetPassword(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) { console.log(err); }
}

export const resetPassword = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.forgetPassword(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (err) { console.log(err); }
}
