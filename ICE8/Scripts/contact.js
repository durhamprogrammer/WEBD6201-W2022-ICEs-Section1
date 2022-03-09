"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_emailAddress;
        get FullName() {
            return this.m_fullName;
        }
        set FullName(full_name) {
            this.m_fullName = full_name;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set ContactNumber(contact_number) {
            this.m_contactNumber = contact_number;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(email_address) {
            this.m_emailAddress = email_address;
        }
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the Contact Object are missing or invalid");
            return "";
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
        toString() {
            return `Full Name: ${this.FullName} \nContact Number: ${this.ContactNumber} \nEmail Address: ${this.EmailAddress}`;
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map