import React, { useState } from 'react'
import { routes } from '../routes'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { useHistory } from "react-router-dom";
import Error from './elements/Error';

function Register() {
    const auth = getAuth();
    const fireStore = useFirestore();
    const history = useHistory();

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

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        preferred_name: '',
        password: '',
    });

    const handleSubmit = async e => {
        e.preventDefault();
        // Signup user to firebase and remove password
        createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
            userCredential.user.displayName = user.preferred_name;

            updateProfile(userCredential.user, {
                displayName: user.preferred_name,
                phoneNumber: user.phoneNumber,
            }).then(() => {
                const usersRef = doc(fireStore, 'users', userCredential.user.uid);
                setDoc(usersRef, {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    phone_number: user.phoneNumber,
                    email: user.email,
                    preferred_name: user.preferredName,
                });
                localStorage.setItem('user', JSON.stringify(user));
                history.push(routes.home);
            });
            // Navigate to home

        }).catch(error => {
            setError({
                hasError: true,
                message: error.message
            });
            console.log(`Registration Error:: ${error}`);
        });
    }

    // onChange function
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
        })
    };

    return <div className="main auth">
        <div className="auth-card">
            {
                error.hasError && <Error error={error} onClick={resetError} />
            }
            <p></p>
            <p className="auth-heading">REGISTER</p>
            <form action="" className="auth-form" onSubmit={handleSubmit}>
                <input type="text" name="firstName" className="text-input" onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" className="text-input" onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="preferredName" className="text-input" onChange={handleChange} placeholder="Preferred Name" />
                <input type="email" name="email" className="text-input" onChange={handleChange} placeholder="Email Address" />
                <input type="tel" name="phoneNumber" className="text-input" onChange={handleChange} placeholder="Phone Number" />
                <input type="password" name="password" className="text-input" onChange={handleChange} placeholder="Password" />
                <input type="password" className="text-input" placeholder="ConfirmPassword" onChange={handleChange} />
                <button className="button-auth">Register</button>
            </form>
            <a href={routes.login} className="link-text">Login Instead.</a>
        </div>
    </div>
}

export default Register
