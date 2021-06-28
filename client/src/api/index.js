import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const getLogedIn= ()=>API.get("/auth/getLogedIn");

export const signin = (formData) => API.post("/auth/signin", formData);;
export const signup = (formData) => API.post("/auth/signup", formData);
export const forgetPassword = (formData) => API.post("/auth/forgetPassword", formData);
export const resetPassword= (formData) => API.post("/auth/resetPassword", formData);
export const logout1= ()=>API.get("/auth/logout");
    export const testFacebook=()=>API.get("/auth/facebookLogin");
    export const testGoogle=()=>API.get("/auth/google");
    export const googleTest2=(formData)=>API.get("/auth/google",formData);
//TO-DO
export const fetchProdect = () => API.get('/posts');
export const createProdect= (newPost) => API.post('/posts', newPost);
export const updateProdect= (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deleteProdect= (id) => API.delete(`/posts/${id}`);
export const likeProdect =(id) => API.patch(`/posts/${id}/likePost`);

