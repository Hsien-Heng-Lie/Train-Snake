"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLog = void 0;
class GameLog {
    constructor(userName, highscore) {
        this.userName = userName;
        this.highscore = highscore;
    }
    getUserName() {
        return this.userName;
    }
    getHighscore() {
        return this.highscore;
    }
}
exports.GameLog = GameLog;
