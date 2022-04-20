import express from 'express';
const router = express.Router();

import passport from 'passport';

// controller instance
import { DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/contact-list';

/*********************************** CONTACT-LIST ROUTES ***************************/
/* Temporary Routes - Contact-List Related */

/* GET contact-list page. */
router.get('/contact-list', DisplayContactListPage);

/* Display the Add Page */
router.get('/add', DisplayAddPage);

/* Process the Add Request */
router.post('/add', ProcessAddPage);

/* Display the Edit Page with Data injected from the db */
router.get('/edit/:id', DisplayEditPage);

/* Process the Edit request */
router.post('/edit/:id', ProcessEditPage);

/* Process the Delete request */
router.get('/delete/:id', ProcessDeletePage);

export default router;
