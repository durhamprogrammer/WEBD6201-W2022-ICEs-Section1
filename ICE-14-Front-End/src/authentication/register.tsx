import React, { ChangeEvent, useEffect, useState }  from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import IUserData from '../models/User';

function Register()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [EmailAddress, setEmailAddress] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        document.title = "Register";
    });

    function onChangeUsername(e: ChangeEvent<HTMLInputElement>)
    {
        setUsername(e.target.value);
    }

    function onChangePassword(e: ChangeEvent<HTMLInputElement>)
    {
        setPassword(e.target.value);
    }

    function onChangeFirstName(e: ChangeEvent<HTMLInputElement>)
    {
        setFirstName(e.target.value);
    }

    function onChangeLastName(e: ChangeEvent<HTMLInputElement>)
    {
        setLastName(e.target.value);
    }

    function onChangeEmailAddress(e: ChangeEvent<HTMLInputElement>)
    {
        setEmailAddress(e.target.value);
    }

    function handleRegister(event: any)
    {
        event.preventDefault();
        const data: IUserData = {
            username: username,
            password: password,
            FirstName: FirstName,
            LastName: LastName,
            EmailAddress: EmailAddress
        }
        
        AuthService.register(data.username, data.password, data.FirstName, data.LastName, data.EmailAddress)
        .then(()=>{
            navigate('/login');
        }, error=>{
           //TODO: Needs Messaging
           window.location.reload();
        });
    }

    return (
        <div>
            <div className="row">
            <div className="offset-md-3 col-md-6 col-sm-12">
                    <div className="login" id="contentArea">
                        <h1 className="display-4">Register</h1>

                        <form onSubmit={handleRegister} id="registerForm">
                        <p className="hint-text">Create your own account. It's free and only takes a minute.</p>

                        <div className="form-group">
                            <div className="row">
                            <p className="lead"><i className="fas fa-user-shield"></i> Personal Information</p>
                            <div className="col-md-6">
                                <input className="form-control" type="text" name="firstName" id="firstName" placeholder="First Name"
                                 value={FirstName}
                                 onChange={onChangeFirstName}
                                 required/>
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" name="lastName" id="lastName" placeholder="Last Name"
                                 value={LastName}
                                 onChange={onChangeLastName}
                                 required/>
                            </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                            <div className="col-md-12">
                                <input type="email" className="form-control" id="emailAddress" name="emailAddress" 
                                value={EmailAddress}
                                onChange={onChangeEmailAddress}
                                required
                                placeholder="Email"/>
                            </div>
                            </div>
                        </div>

                        <div className="form-group mt-4">
                            <div className="row">
                            <p className="lead"><i className="fas fa-database"></i> System Identification</p>
                            <div className="col-md-12">
                                <input type="text" className="form-control" id="username" name="username"  required
                                value={username}
                                onChange={onChangeUsername}
                                placeholder="Username"/>
                            </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                            <div className="col-md-12">
                                <input type="password" className="form-control" id="password" name="password"  required
                                value={password}
                                onChange={onChangePassword}
                                placeholder="Password"/>
                            </div>
                            </div>
                        </div>
                                                            
                        <div className="text-end mt-2">
                            <button id="submitButton" type="submit" className="btn btn-primary btn-lg">
                            <i className="fas fa-user-plus"></i> Register</button>
                            <button id="cancelButton" type="reset" className="btn btn-warning btn-lg">
                            <i className="fas fa-undo"></i> Cancel</button>
                        </div>
                        </form>
                    
                    </div>
                    <p className="text-center text-muted small">
                    Already have an account? 
                    <Link to={"/login"} className="link">Sign in</Link>
                    </p>
            </div>
            </div>

            
        </div>
    );

}

export default Register;