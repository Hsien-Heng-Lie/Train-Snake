"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const indexController = express_1.default.Router();
indexController.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/markup/login.html"));
});
indexController.get("/game", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/markup/game.html"));
});
indexController.get("/scores", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/markup/scores.html"));
});
exports.default = indexController;
