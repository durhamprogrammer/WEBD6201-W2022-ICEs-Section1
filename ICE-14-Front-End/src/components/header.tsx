import React, {useEffect, useState} from 'react';
import { NavLink} from 'react-router-dom';
import AuthService from '../services/AuthService';

function Header()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [value,setValue] = useState({});

    useEffect(()=>{
        setIsLoggedIn(AuthService.getCurrentUser())
        setValue({});
    });

    function toggleLogin()
    {
        if(isLoggedIn)
        {
            return(
                <li id="logout" className="nav-item">
                    <NavLink to={"/logout"} className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                </li>
            );
        }
        else
        {
            return(
                   <li id="login" className="nav-item">
                        <NavLink to={"/login"} className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                    </li> 
            );
        }

    }

    function toggleContactList()
    {
        if(isLoggedIn)
        {
            return(
            <li id="contactListLink" className="nav-item">
                <NavLink to={"/contact-list"} className="nav-link"><i className="fas fa-users"></i> Contact List</NavLink>
            </li>
            );
        }
    }
      
    return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink to={"/home"} className="navbar-brand"><i className="fas fa-spider"></i> WEBD6201</NavLink>
                <button className="navbar-toggler" type="button" href-bs-toggle="collapse" href-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={"/home"} className="nav-link"><i className="fas fa-home"></i> Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/about"} className="nav-link"><i className="fas fa-info"></i> About Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/projects"} className="nav-link"><i className="fas fa-project-diagram"></i> Our Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/services"} className="nav-link"><i className="fas fa-map-signs"></i> Our Services</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/contact"} className="nav-link"><i className="fas fa-envelope"></i> Contact Us</NavLink>
                        </li>
                        {toggleContactList()}
                        {toggleLogin()}
                        
                    </ul>
                </div>
            </div>
        </nav>
            
            
        </div>
        );

}

export default Header;


