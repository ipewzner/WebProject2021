import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });
//const PostUrl = 'http://localhost:4000/posts';
//const AuthUrl = 'http://localhost:4000/user';
//const url = 'http://localhost:4000/posts';

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post("/auth/signin", formData);;
export const signup = (formData) => API.post("/auth/signup", formData);
export const forgetPassword = (formData) => API.post("/auth/forgetPassword", formData);
export const resetPassword= (formData) => API.post("/auth/resetPassword", formData);
//TO-DO
export const fetchProdect = () => API.get('/posts');
export const createProdect= (newPost) => API.post('/posts', newPost);
export const updateProdect= (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deleteProdect= (id) => API.delete(`/posts/${id}`);
export const likeProdect =(id) => API.patch(`/posts/${id}/likePost`);

