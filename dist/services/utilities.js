"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserIdFromToken = (req) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        throw new Error('Token mancante');
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
    if (!decoded.userId) {
        throw new Error('UserId non presente nel token');
    }
    return decoded.userId;
};
exports.getUserIdFromToken = getUserIdFromToken;
