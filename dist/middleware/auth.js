"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const error_1 = __importDefault(require("../error/error"));
const auth = (req, res, next) => {
    try {
        const token = _getToken(req);
        if (!token)
            return next(new error_1.default(400, "tokenがありませんでした。"));
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode)
            return next(new error_1.default(400, "tokenが一致しませんでした。"));
        res.locals.decode = decode;
        next();
    }
    catch (e) {
        console.log(e);
        next(new error_1.default(400, "tokenエラー"));
    }
};
exports.auth = auth;
const _getToken = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
};
//# sourceMappingURL=auth.js.map