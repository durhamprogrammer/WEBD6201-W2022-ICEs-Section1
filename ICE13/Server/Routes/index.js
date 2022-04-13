"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
//# sourceMappingURL=index.js.map