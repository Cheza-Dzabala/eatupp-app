import React from 'react'
import logo from '../../images/logo.png';
import LineIcon from 'react-lineicons';
import { routes } from '../../routes';
import { useUser } from 'reactfire';
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom';


function Header() {
    const { status, data: user } = useUser();
    return <div className="header">
        <Link to={routes.home}> <img src={logo} alt="Application Logo" /> </Link>
        <div className="header-end">
            {
                status === "loading" ? <div>Loading...</div> :
                    status === "error" ? <div>Error</div> :
                        user ? <Authenticated /> : <AuthLinks />
            }
        </div>
    </div>
}

export default Header


const logout = async () => {
    const auth = getAuth();
    auth.signOut();
    window.localStorage.clear();
    window.history.pushState({}, "", "/");
}

const AuthLinks = () => {
    return <div className="">
        <input className="text-input" type="text" placeholder="Search Food" />
        <a className="link-text" href={routes.login}>
            <LineIcon name="user" /> {" "}
            Login
        </a>
        <a className="link-text" href={routes.register}> <LineIcon name="users" /> {" "}Register</a>
    </div>
}

const Authenticated = () => <div className="">
    <input className="text-input" type="text" placeholder="Search Food" />
    <span className="link-text" onClick={() => logout()}><LineIcon name="exit" /> {" "}Logout</span>
</div>