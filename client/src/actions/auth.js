import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        console.log("signin->formData: "+JSON.stringify(formData));
        const { data } = await api.signin(formData);
        console.log("**2.1** ");
        console.log("signin->data: "+JSON.stringify(data));

        dispatch({ type: AUTH,  data});
        history.push('/');
    } catch (err) { console.log(err);}
}

export const logout1 = () => async (dispatch) => {
    console.log("**loguot test 01** ");
    const { data } = await api.logout1();

}

export const testGoogle = (history) => async (dispatch) => {
    
    console.log("**testGoogle test 01** ");
    const { data } = await api.testGoogle();
    dispatch({ type: AUTH,  data});
    history.push('/');
    console.log("**testGoogle data1: ");
    console.log("**testGoogle data2: "+data);
}

export const googleTest2= (formData, history)=> async (dispatch) => {
    console.log("**googleTest2 data1: ");
    try {
        const { data } = await api.googleTest2(formData);
        dispatch({ type: AUTH,  data});
        history.push('/');
    } catch (err) {console.log(err);}
  //  console.log("**googleTest2 data1: "+data);
}
    
export const testFacebook = () => async (dispatch) => {
    
    console.log("**testFacebook test 01** ");
    const { data } = await api.testFacebook();
    console.log("**testFacebook data1: ");
    console.log("**testFacebook data2: "+data);
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH,  data});
        history.push('/');
    } catch (err) {console.log(err);}
}

export const forgetPassword = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.forgetPassword(formData);
        dispatch({ type: AUTH,  data});
        history.push('/');
        } catch (err) { console.log(err);}
}

export const resetPassword = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.forgetPassword(formData);
        dispatch({ type: AUTH,  data});
        history.push('/');
        } catch (err) { console.log(err);}
}

