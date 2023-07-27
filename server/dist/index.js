"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_routes_1 = __importDefault(require("./controllers/index.routes"));
const auth_routes_1 = __importDefault(require("./controllers/auth.routes"));
const dbHandler_1 = require("./database/dbHandler");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
// DEBUG ///////////////////////////
console.log(process.env.DATABASE);
let res = (0, dbHandler_1.getHighScores)();
console.log(res);
////////////////////////////////////
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
// WEBSERVER
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
