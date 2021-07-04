import {CREATE,UPDATE ,DELETE ,FETCH_ALL} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getUsers = () => async (dispatch) => {
    console.log("getUsers123");

    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const createUser =(user)=>async (dispatch) => {
    try {
        const { data } = await api.createUser(user);
        dispatch({ type: CREATE, payload: data});
    }catch(err){
        console.log(err);
    }
}

export const updateUser = (id,user)=>async (dispatch) => {
    try {
        const { data } = await api.updateUser(id,user);
        dispatch({ type: UPDATE, payload:data});
    }catch(err){
        console.log(err);
    }
}

export const deleteUser = (id)=>async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE, payload:id});
    }catch(err){
        console.log(err);
    }
}
