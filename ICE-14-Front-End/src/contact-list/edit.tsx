import React, {ChangeEvent, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ContactListDataService from '../services/ContactListDataService';
import IContactData from '../models/Contact';

export default function EditContact()
{
    const [FullName, SetFullName] = useState('');
    const [ContactNumber, SetContactNumber] = useState('');
    const [EmailAddress, SetEmailAddress] = useState('');  
    const { id } = useParams();

    useEffect(()=>{
        getContact(id);
        document.title = "Edit";
    });

    function onChangeFullName(e: ChangeEvent<HTMLInputElement>)
    {
        SetFullName(e.target.value);
    }

    function onChangeContactNumber(e: ChangeEvent<HTMLInputElement>)
    {
        SetContactNumber(e.target.value);
    }

    function onChangeEmailAddress(e: ChangeEvent<HTMLInputElement>)
    {
        SetEmailAddress(e.target.value);
    }

    function getContact(id: any)
    {
        ContactListDataService.readOne(id)
        .then((response: any) =>{
            SetFullName(response.data.contact.FullName);
            SetContactNumber(response.data.contact.ContactNumber);
            SetEmailAddress(response.data.contact.EmailAddress);
        })
        .catch((e: Error) =>{
            console.log(e);
        });
    }

    function saveContact(e:any)
    {
        e.preventDefault();
        const data: IContactData = {
            _id: id,
            FullName: FullName,
            ContactNumber: ContactNumber,
            EmailAddress: EmailAddress
        }

        ContactListDataService.update(data, id)
            .then((response: any) => 
            {
                SetFullName(response.data.FullName);
                SetContactNumber(response.data.ContactNumber);
                SetEmailAddress(response.data.EmailAddress);
            })
            .catch((e: Error) =>{
                console.log(e);
            });

        window.location.href = "/contact-list";
    }
        return(
            <div>
                    <h1>Edit Contact</h1>
                    <div id="messageArea"></div>

                    <div className="row justify-content-lg-center g-3">
                    <form onSubmit={saveContact} className="col-lg-6 col-md-10 col-sm-10">

                        <div className="input-group mb-3">
                        <span className="input-group-text">Full Name</span>
                        <input id="fullName" name="FullName" type="text" className="form-control" 
                        value={FullName}
                        onChange={onChangeFullName}
                        aria-label="Full Name" aria-describedby="Full Name Input" required/>
                        </div>

                        <div className="input-group mb-3">
                        <span className="input-group-text">Contact Number</span>
                        <input id="contactNumber" name="ContactNumber" type="tel" className="form-control" 
                        value={ContactNumber}
                        onChange={onChangeContactNumber}
                        aria-label="Contact Number" aria-describedby="Contact Number Input" required/>
                        </div>

                        <div className="input-group mb-3">
                        <span className="input-group-text">Email Address</span>
                        <input id="emailAddress" name="EmailAddress" type="email" className="form-control" 
                        value={EmailAddress}
                        onChange={onChangeEmailAddress}
                        aria-label="Email Address" aria-describedby="Email Address Input" required/>
                        
                        </div>
                        <button type="submit" className="btn btn-primary"><i className="fas fa-edit fa-lg"></i> Edit</button>
                        <Link to={"/contact-list"} id="cancelButton" type="button" className="btn btn-warning"><i className="fas fa-undo fa-lg"></i> Cancel</Link>
                    
                    </form>

                    </div>
                </div>
        );

}