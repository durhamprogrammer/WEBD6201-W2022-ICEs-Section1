"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
let router = express_1.default.Router();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "./Client")));
app.use(express_1.default.static(path_1.default.join(__dirname, "./node_modules")));
app.set("views", path_1.default.join(__dirname, "./Views"));
app.set("view engine", "ejs");
app.use(router);
router.get('/', function (req, res) {
    res.render("index", { title: "Hello, World!" });
});
router.get('/home', function (req, res) {
    res.render("index", { title: "Home" });
});
app.listen(port, function () {
    console.log(`Server listening at ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map