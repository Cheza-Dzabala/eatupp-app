import React from 'react'
import Header from './components/elements/Header'
import Footer from './components/elements/Footer'

function Layout({ children }) {
    return <div className="layout">
        <Header />
        {children}
        <Footer />
    </div>
}

export default Layout
