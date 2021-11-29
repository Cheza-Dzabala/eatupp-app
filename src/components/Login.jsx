import React, { useState, useContext } from 'react'
import { routes } from '../routes'
import { useHistory } from "react-router-dom";
import Error from './elements/Error';
import { AuthContext } from '../context/auth-context';
import axios from '../config/axios';

function Login() {
    const history = useHistory();
    const [user, setUser] = useContext(AuthContext);
    const [userCredential, setUserCredential] = useState({
        email: '',
        password: '',
    });

    const resetError = () => {
        setError({
            hasError: false,
            message: '',
        })
    }
    const [error, setError] = useState({
        hasError: false,
        message: ''
    });

    const handleChange = (e) => {
        setUserCredential({
            ...userCredential,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        axios.post('/auth/login/', userCredential).then(res => {
            const {data} = res.data;
            window.localStorage.setItem('token', data.access_token);
            window.localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            history.push(routes.home);
        }).catch(err => {
            console.log({err})
        })
    }
    return <div className="main auth">
        <div className="auth-card">
            {
                error.hasError && <Error error={error} onClick={resetError} />
            }
            <p className="auth-heading">Login</p>
            <form action="" onSubmit={login} className="auth-form">
                <input type="email" className="text-input" name="email" onChange={handleChange} placeholder="Email Address" />
                <input type="password" className="text-input" name="password" onChange={handleChange} placeholder="Password" />
                <button className="button-auth">Login</button>
            </form>
            <a href={routes.forgotPassword} className="link-text">Forgot Password?</a>
            <a href={routes.register} className="link-text">Register Instead.</a>
        </div>
    </div>
}

export default Login
