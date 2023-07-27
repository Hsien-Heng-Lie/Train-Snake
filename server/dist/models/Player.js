"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
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
exports.Player = Player;
