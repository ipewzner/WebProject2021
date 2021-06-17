import {CREATE,UPDATE ,DELETE ,FETCH_ALL} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getProdect = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const createProdect =(post)=>async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data});
    }catch(err){
        console.log(err);
    }
}

export const updateProdect = (id,post)=>async (dispatch) => {
    try {
        const { data } = await api.updatePost(id,post);
        dispatch({ type: UPDATE, payload:data});
    }catch(err){
        console.log(err);
    }
}

export const deleteProdect = (id)=>async (dispatch) => {
    try {
        await api.deleteProdect(id);
        dispatch({ type: DELETE, payload:id});
    }catch(err){
        console.log(err);
    }
}

export const likeProdect = (id)=>async (dispatch) => {
    try {
        const { data } = await api.likeProdect(id);
        dispatch({ type: UPDATE, payload:data});
    }catch(err){
        console.log(err);
    }
}