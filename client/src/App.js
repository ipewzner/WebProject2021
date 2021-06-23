import React  from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import store from './components/store/store';
import Blogs from './components/Blogs/Blogs';
import Chat from './components/Chat/Chat';
 

const App = () => {

    return (
        <BrowserRouter>    
            <Container maxWidth='lg'>
            <Navbar />
                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/chat" exact component={Chat} />
                <Route path="/about" exact component={About} />
                <Route path="/auth"   component={Auth} />
                <Route path="/store" exact component={store} />
                <Route path="/blogs" exact component={Blogs} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}
export default App;