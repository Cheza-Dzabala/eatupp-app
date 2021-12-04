import React, { useState, useContext } from 'react'
import { routes } from '../routes'
import { useHistory } from "react-router-dom";
import Error from './elements/Error';
import { AuthContext } from '../context/auth-context';
import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from '../components/alerts/Alert';

function Login() {
    const history = useHistory();

    const [open, setOpen] = useState(false);    
    const [response, setResponse] = useState({
        message: '',
        severity: 'success'
    });

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const login = async (e) => {
        e.preventDefault();
        axios.post('/auth/login/', userCredential).then(res => {
            const {data} = res.data;
            window.localStorage.setItem('token', data.access_token);
            window.localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            history.push(routes.home);
        }).catch(({response} )=> {
            console.log(response);
            setResponse({
                message: response.data.message,
                severity: 'error'
            })
            setOpen(true);
        })
    }
    return <div className="main auth">
           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={response.severity} sx={{ width: '100%' }}>
            {response.message}
        </Alert>
      </Snackbar>
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
