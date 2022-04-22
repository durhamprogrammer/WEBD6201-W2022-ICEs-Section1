import React, { useEffect }  from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Logout()
{
    useEffect(()=>{
        document.title = "Logout";
        AuthService.logout();
    });
    
    return(
        < Navigate to="/login"/>
    );

}

export default Logout;