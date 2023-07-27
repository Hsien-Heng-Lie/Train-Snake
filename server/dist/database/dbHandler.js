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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHighScores = exports.insertGameLog = exports.upsertUser = void 0;
const { sql, poolPromise } = require('./dbService');
const Player_1 = require("../models/Player");
function upsertUser(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield poolPromise;
        const result = yield pool.request()
            .input('UserName', sql.String, userName)
            .execute('UpsertUser');
        const player = new Player_1.Player(result.recordset[0].UserName, result.recordset[0].highScore);
        return player;
    });
}
exports.upsertUser = upsertUser;
function insertGameLog(userName, score) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield poolPromise;
        const result = yield pool.request()
            .input('UserName', sql.String, userName)
            .input('Score', sql.Int, score)
            .execute('InsertGameLog');
        return result;
    });
}
exports.insertGameLog = insertGameLog;
function getHighScores() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield poolPromise;
        const result = yield pool.request()
            .execute('GetHighScores');
        return result;
    });
}
exports.getHighScores = getHighScores;