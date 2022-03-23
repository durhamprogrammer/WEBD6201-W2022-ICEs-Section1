namespace core
{
    export class Contact
    {
        // private instance members
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;

        // getters and setters
        get FullName(): string
        {
            return this.m_fullName;
        }
    
        set FullName(full_name: string)
        {
            this.m_fullName = full_name;
        }
    
        get ContactNumber(): string
        {
            return this.m_contactNumber;
        }
    
        set ContactNumber(contact_number: string)
        {
            this.m_contactNumber = contact_number;
        }
    
        get EmailAddress(): string
        {
            return this.m_emailAddress;
        }
    
        set EmailAddress(email_address: string)
        {
            this.m_emailAddress = email_address;
        }
    
        // constructor
        constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "")
        {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
    
        // public utility methods
    
        serialize() : string
        {
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the Contact Object are missing or invalid");
            return "";
        }
    
        deserialize(data: string): void // assume that data is in a comma-separated format (string array of properties)
        {
            let propertyArray: string[] = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    
        // overridden methods
    
        toString(): string
        {
            return `Full Name: ${this.FullName} \nContact Number: ${this.ContactNumber} \nEmail Address: ${this.EmailAddress}`;
        }
    }
}
    
    