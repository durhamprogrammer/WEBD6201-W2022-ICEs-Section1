"use strict";
class Contact
{
    // getters and setters
    get FullName()
    {
        return this.m_fullName;
    }

    set FullName(full_name)
    {
        this.m_fullName = full_name;
    }

    get ContactNumber()
    {
        return this.m_contactNumber;
    }

    set ContactNumber(contact_number)
    {
        this.m_contactNumber = contact_number;
    }

    get EmailAddress()
    {
        return this.m_emailAddress;
    }

    set EmailAddress(email_address)
    {
        this.m_emailAddress = email_address;
    }

    // constructor
    constructor(fullName, contactNumber, emailAddress)
    {
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }

    // overridden methods

    toString()
    {
        return `Full Name: ${this.FullName} \nContact Number: ${this.ContactNumber} \nEmail Address: ${this.EmailAddress}`;
    }
}