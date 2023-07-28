"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_routes_1 = __importDefault(require("./controllers/index.routes"));
const auth_routes_1 = __importDefault(require("./controllers/auth.routes"));
const api_routes_1 = __importDefault(require("./controllers/api.routes"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
require("./config/passport");
const app = (0, express_1.default)();
const passport = require('passport');
const session = require('express-session');
// SESSIONS
app.use(passport.initialize());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.session());
app.use(body_parser_1.default.json());
// VIEWS
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "markup")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "scripts")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "styles")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "resources")));
// CONTROLLERS
app.use(index_routes_1.default);
app.use(auth_routes_1.default);
app.use(api_routes_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
