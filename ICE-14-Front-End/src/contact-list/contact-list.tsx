import React, {useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import ContactListDataService from '../services/ContactListDataService';
import IContactData from '../models/Contact';

function ContactList()
{
    const [contacts, setContacts] = useState<Array<IContactData>>([]);

    useEffect(()=>{   
        readContacts();
    }, []);

    function refreshList()
    {
        readContacts();
    }

    function readContacts()
    {
        ContactListDataService.readAll()
        .then((response: any) =>{

            setContacts(response.data.contacts);
        })
        .catch((e: Error)=>{
            console.log(e);
        });
    }

    function deleteContact(id: string)
    {
        ContactListDataService.delete(id)
        .then((response: any) =>{
            refreshList();
        })
        .catch((e: Error)=>{
            console.log(e);
        });
    }

    function confirmDelete(id: string)
    {
        if(!window.confirm("Are You Sure?"))
        {
            refreshList();
            return;
        }
        deleteContact(id);
    }

    return(
        <div>
            <h1>Contact List</h1>

            <div className="row">
            <div className="col">

                <Link to={"/add"} id="addButton" className="btn btn-primary mb-1"><i className="fas fa-plus-circle"></i> Add Contact</Link>

                <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" className="text-center">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Email Address</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="contactList">
                {   contacts &&
                    contacts.map((contact:IContactData, index: number)=>{
                        return(
                            <tr key="{index}" >
                                <th scope="row" className="text-center">{index + 1}</th>
                                <td>{contact.FullName}</td>
                                <td>{contact.ContactNumber}</td>
                                <td>{contact.EmailAddress}</td>
                                <td className="text-center"><Link to={`/edit/${contact._id}`} className="btn btn-primary btn-sm edit"><i className="fas fa-edit fa-sm"></i> Edit</Link></td>
                                <td className="text-center"><button onClick={()=>{confirmDelete(contact._id)}} className="btn btn-danger btn-sm delete"><i className="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                            </tr>
                        )
                    })
                }

                </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}

export default ContactList;