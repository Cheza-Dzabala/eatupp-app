import React, { useContext, useEffect } from 'react'
import Header from './components/elements/Header'
import Footer from './components/elements/Footer'
import { AuthContext } from './context/auth-context';

function Layout({ children }) {

    const userData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useContext(AuthContext);

    useEffect(() => {
        setUser(userData);
    }, [])
    return <div className="layout">
        <Header />
        {children}
        <Footer />
    </div>
}

export default Layout
