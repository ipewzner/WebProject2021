import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signinByToken = (formData) => API.post("/users/signinByToken", formData);
export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const forgetPassword = (formData) => API.post("/users/forgetPassword", formData);
export const resetPassword = (formData) => API.post("/users/resetPassword", formData);

//TO-DO
export const fetchProducts = () => API.get('/products');
export const createProduct = (newPost) => API.post('/posts', newPost);
export const updateProduct = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const likeProduct = (id) => API.patch(`/posts/${id}/likePost`);


export const fetchUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const fetchCartProducts = (user) => API.get(`/cart/${user}/products`);
export const addToCart = (user, id) => API.post(`/cart/${user}/${id}`);
export const removeFromCart = (user, id) => API.delete(`/cart/${user}/${id}`);
