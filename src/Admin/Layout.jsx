import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/auth-context';
import Sidebar from './components/Sidebar'
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


function AdminLayout({children}) {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    
    const userData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useContext(AuthContext);

    useEffect(() => {
        setUser(userData);
    }, [])
    return <ThemeProvider theme={theme}>

    <div className="admin-container">
        <Sidebar />
       <div className="admin-layout">
       {children}
       </div>
    </div>
    </ThemeProvider>
}

export default AdminLayout
