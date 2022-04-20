import express, {Request, Response, NextFunction} from 'express';

import Contact from '../Models/contact';
import { UserDisplayName } from '../Util/index';

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
      res.render('index', 
        { title: 'Contact List', page: 'contact-list', contacts: contactsCollection,  displayName: UserDisplayName(req) });
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: UserDisplayName(req) });
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
      res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: UserDisplayName(req) });
    });
}

// Process Functions
export function ProcessAddPage(req: Request, res: Response, next: NextFunction):void
{
    // instantiate a new  contact to add
    let newContact = new Contact
    ({
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
    });

    // insert contact into db
    Contact.create(newContact, function(err)
    {
    if(err)
    {
        console.error(err);
        res.end(err);
    }

    // newContact has been added to the db -> go to the contact-list
    res.redirect('/contact-list');
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
  
      // edit was successful -> go to the contact-list page
      res.redirect('/contact-list')
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
      res.redirect('/contact-list');
    });
}