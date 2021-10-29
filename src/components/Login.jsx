import React, { useState } from 'react'
import { routes } from '../routes'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useHistory } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import Error from './elements/Error';
import { useFirestore } from 'reactfire';

function Login() {
    const auth = getAuth();
    const fireStore = useFirestore();
    const history = useHistory();

    const [user, setUser] = useState({
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
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                const usersRef = doc(fireStore, 'users', userCredential.user.uid);
                const docSnap = await getDoc(usersRef);
                if (docSnap.exists()) {
                    window.localStorage.setItem('user', JSON.stringify(docSnap.data()));
                    history.push(routes.home);
                }
            })
            .catch(error => {
                setError({
                    hasError: true,
                    message: error.message
                });
            });

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
