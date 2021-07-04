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

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const forgetPassword = (formData) => API.post("/users/forgetPassword", formData);

//TO-DO
export const fetchProducts = () => API.get('/products');
export const createProduct = (newPost) => API.post('/posts', newPost);
export const updateProduct = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deleteProduct = (id) => API.delete(`/posts/${id}`);
export const likeProduct = (id) => API.patch(`/posts/${id}/likePost`);

export const fetchCartProducts = (user) => API.get(`/cart/${user}/products`);
export const addToCart = (user, id) => API.post(`/cart/${user}/${id}`);
