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
exports.logOut = exports.logIn = void 0;
const user_service_1 = require("../services/user_service");
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const argon2 = __importStar(require("argon2"));
const error_1 = __importDefault(require("../error/error"));
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_service_1.userService.findByEmail(email);
        if (!user)
            return next(new error_1.default(400, "メールアドレスが正しくありません。"));
        if (password.length < 8)
            return next(new error_1.default(400, "パスワードは８文字以上でお願いします。"));
        const valid = yield argon2.verify(user.password, password);
        if (!valid)
            return next(new error_1.default(400, "パスワードが正しくありません。"));
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const buildUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({ user: buildUser, token });
    }
    catch (error) {
        console.log(error);
        next(new error_1.default(400, "ログインに失敗しました。"));
    }
});
exports.logIn = logIn;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.decode.id;
        const user = yield user_service_1.userService.findById(id);
        if (!user) {
            return next(new error_1.default(400, "ログアウトするユーザーがいません。"));
        }
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        next(new error_1.default(400, "ログアウトに失敗しました。"));
    }
});
exports.logOut = logOut;
//# sourceMappingURL=auth_controller.js.map