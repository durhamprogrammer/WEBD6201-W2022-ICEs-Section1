import React, { ChangeEvent, useEffect, useState }  from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import IUserData from '../models/User';

function Login()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        document.title = "Login";
    });

    function onChangeUsername(e: ChangeEvent<HTMLInputElement>)
    {
        setUsername(e.target.value);
    }

    function onChangePassword(e: ChangeEvent<HTMLInputElement>)
    {
        setPassword(e.target.value);
    }

    function handleLogin(event: any)
    {
        event.preventDefault();
        const data: IUserData = {
            username: username,
            password: password,
            FirstName: '',
            LastName: '',
            EmailAddress: ''
        }
        
        AuthService.login(data.username, data.password)
        .then(()=>{
            navigate('/contact-list');
        }, error=>{
            //TODO: Needs Messaging
           window.location.reload();
        });
    }

        return (
            <div>
            <div className="offset-md-3 col-md-6 col-sm-12">
            <div  className="login" id="contentArea">
                <h1 className="display-4">Login</h1>
                <form onSubmit={handleLogin} id="loginForm">
                <div className="form-group mb-2">
                    <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" id="username" name="username"  required
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Enter your username"/>
                    </div>
                
                </div>

                <div className="form-group mb-2">
                    <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-lock">
                        </i>
                    </span>
                    <input type="password" className="form-control" id="password" name="password"  required
                    value={password}
                    onChange={onChangePassword} 
                    placeholder="Enter your password"/>
                    </div>
                
                </div>                                        
                <div className="text-end">
                    <button id="loginButton" type="submit" className="btn btn-primary btn-lg">
                    <i className="fas fa-sign-in-alt"></i> Login</button>
                    <button id="cancelButton" type="reset" className="btn btn-warning btn-lg">
                        <i className="fas fa-undo"></i> Cancel</button>
                </div>
            </form>
                
            </div>
            <p className="text-center text-muted small">
                Don't have an account? 
            <Link to={"/register"} className="link">Register Here!</Link>
            </p>
            </div>
            </div>
        );

}

export default Login;