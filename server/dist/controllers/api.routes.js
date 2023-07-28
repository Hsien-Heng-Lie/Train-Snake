"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbHandler_1 = require("../database/dbHandler");
const apiController = express_1.default.Router();
apiController.get("/api/player", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let username = ((_a = req.headers['username']) === null || _a === void 0 ? void 0 : _a.toString()) + "";
    let player = yield (0, dbHandler_1.upsertUser)(username);
    res.json({
        player
    });
}));
apiController.get("/api/scoreboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scores = yield (0, dbHandler_1.getHighScores)();
    console.log(scores);
    res.json({
        scores
    });
}));
apiController.post("/api/scores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        let username = ((_b = req.body['username']) === null || _b === void 0 ? void 0 : _b.toString()) + "";
        let score = Number((_c = req.body['score']) === null || _c === void 0 ? void 0 : _c.toString());
        let result = yield (0, dbHandler_1.insertGameLog)(username, score);
        return res.sendStatus(200);
    }
    catch (_d) {
        return res.sendStatus(500);
    }
}));
exports.default = apiController;
