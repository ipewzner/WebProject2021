import React, { useState,useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import store from './components/store/store';
import Blogs from './components/Blogs/Blogs';
import Chat from './components/Chat/Chat';
import Users from './components/Users/Users';
import Cart from './components/Cart/Cart';
import { useDispatch } from 'react-redux';
import {getUsers} from './actions/users';
const App = () => { 
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
useEffect(() => {dispatch(getUsers())},[])
    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                    {user && (
                        <>
                            <Route path="/about" exact component={About} />
                            <Route path="/chat" exact component={Chat} />
                            <Route path="/store" exact component={store} />
                            <Route path="/blogs" exact component={Blogs} />
                            {user.result.type = 'admin' && (<Route path="/Users" exact component={Users} />)}
                            <Route path="/cart" exact component={Cart} />
                        </>
                    )}
                </Switch>
            </Container>
        </BrowserRouter>
    );
}
export default App;