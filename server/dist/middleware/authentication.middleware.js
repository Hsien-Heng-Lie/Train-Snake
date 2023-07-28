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
exports.ensureAuthenticated = void 0;
function ensureAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO Implemnt cookie parser
        if (req.isAuthenticated()) {
            // If user is authenticated, allow them to proceed
            return next();
        }
        else {
            // If user is not authenticated, redirect to login page or show an error
            return res.redirect('/'); // Modify the URL according to your application's routes
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
