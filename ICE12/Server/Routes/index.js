"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const contact_1 = __importDefault(require("../Models/contact"));
const user_1 = __importDefault(require("../Models/user"));
const index_1 = require("../Util/index");
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: (0, index_1.UserDisplayName)(req) });
});
router.get('/login', function (req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: (0, index_1.UserDisplayName)(req) });
    }
    return res.redirect('/contact-list');
});
router.post('/login', function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
});
router.get('/register', function (req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: (0, index_1.UserDisplayName)(req) });
    }
    return res.redirect('/contact-list');
});
router.post('/register', function (req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error');
            }
            console.error(err.name);
            req.flash('registerMessage', 'Server Error');
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/contact-list');
        });
    });
});
router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/login');
});
router.get('/contact-list', index_1.AuthGuard, function (req, res, next) {
    contact_1.default.find(function (err, contactsCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactsCollection, displayName: (0, index_1.UserDisplayName)(req) });
    });
});
router.get('/add', index_1.AuthGuard, function (req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: (0, index_1.UserDisplayName)(req) });
});
router.post('/add', index_1.AuthGuard, function (req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.create(newContact, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
router.get('/edit/:id', index_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id, {}, {}, function (err, contactToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: (0, index_1.UserDisplayName)(req) });
    });
});
router.post('/edit/:id', index_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updatedContact, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
router.get('/delete/:id', index_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map