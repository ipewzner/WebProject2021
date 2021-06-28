import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { AUTH } from './constants/actionTypes';
import { useDispatch } from 'react-redux';

import { AxiosResponse } from 'axios';
export const myContext = createContext({});

export default function Context(props) {
    const [userObject, setUserObject] = useState();
    const dispatch = useDispatch();

    useEffect(() => {

        axios.get("http://localhost:5000/auth/getuser", { withCredentials: true })
            .then((response) => {
                if (response.data) {
                    setUserObject(response.data);
                    localStorage.setItem('profile', JSON.stringify(response.data));
                 //   dispatch({ type: AUTH, userObject});
                    console.log("response.data: "+JSON.stringify(response.data))

                }
            })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}