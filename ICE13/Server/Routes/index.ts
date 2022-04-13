import express from 'express';
const router = express.Router();
import passport from 'passport';

import Contact from '../Models/contact';
import User from '../Models/user';
import { AuthGuard, UserDisplayName } from '../Util/index';

/*********************************** TOP-LEVEL ROUTES ***************************/

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
});

/* GET home page. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
});

/* GET about page. */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req) });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req) });
});

/* GET services page. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', displayName: UserDisplayName(req) });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req) });
});

/*********************************** CONTACT-LIST ROUTES ***************************/
/* Temporary Routes - Contact-List Related */

/* GET contact-list page. */
router.get('/contact-list', AuthGuard, function(req, res, next) 
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
  
  
});

/* Display the Add Page */
router.get('/add', AuthGuard, function(req, res, next) 
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: UserDisplayName(req) });
});

/* Process the Add Request */
router.post('/add', AuthGuard, function(req, res, next) 
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
  })
});

/* Display the Edit Page with Data injected from the db */
router.get('/edit/:id', AuthGuard, function(req, res, next) 
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
});

/* Process the Edit request */
router.post('/edit/:id', AuthGuard, function(req, res, next) 
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
});

/* Process the Delete request */
router.get('/delete/:id', AuthGuard, function(req, res, next) 
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
});


export default router;
