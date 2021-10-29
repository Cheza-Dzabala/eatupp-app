import React from 'react'
import { routes } from '../routes'

function ForgotPassword() {
    return <div className="main auth">
        <div className="auth-card">
            <p className="auth-heading">Reset Password</p>
            <form action="" className="auth-form">
                <input type="email" className="text-input" placeholder="Email Address" />
                <button className="button-auth">Reset Password</button>
            </form>
            <a href={routes.login} className="link-text">Login Instead.</a>
        </div>
    </div>
}

export default ForgotPassword
