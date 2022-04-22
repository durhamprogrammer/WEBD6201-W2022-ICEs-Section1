import express, {Request, Response, NextFunction} from 'express';

import Contact from '../Models/contact';

// Display Functions
export function DisplayContactListPage(req: Request, res: Response, next: NextFunction):void
{
    Contact.find(function(err, contactsCollection)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }    
      res.json({success: true, msg: 'Contact-List Displayed Successfully', contacts: contactsCollection, user: req.user});
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction):void
{
  res.json({success: true, msg: 'Add Page Displayed Successfully'});
}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    // pass the id to the db and read the contact in
    Contact.findById(id, {}, {}, function(err, contactToEdit)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      // show the edit view with the data
      res.json({success: true, msg: 'Edit Page Displayed Successfully', contact: contactToEdit});
    });
}

// Process Functions
export function ProcessAddPage(req: Request, res: Response, next: NextFunction):void
{
    // instantiate a new  contact to add
    let newContact = new Contact
    ({
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
    });

    // insert contact into db
    Contact.create(newContact, function(err)
    {
    if(err)
    {
        console.error(err);
        res.end(err);
    }

    res.json({success: true, msg: 'Successfully Added Contact', contact: newContact});
    });
}

export function ProcessEditPage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    // instantiate a new contact to edit
    let updatedContact = new Contact
    ({
      "_id": id,
      "FullName": req.body.fullName,
      "ContactNumber": req.body.contactNumber,
      "EmailAddress": req.body.emailAddress
    });
  
    // db.contacts.update
    Contact.updateOne({_id:id}, updatedContact, function(err: ErrorCallback)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.json({success: true, msg: 'Successfully Edit Contact', contact: updatedContact});
    });
}

export function ProcessDeletePage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    // pass the id to the db and delete the contact
    Contact.remove({_id: id}, function(err)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      // delete was successful
      res.json({success: true, msg: 'Successfully Deleted Contact'});
    });
}