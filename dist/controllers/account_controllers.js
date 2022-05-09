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
exports.updateAccount = exports.createAccount = exports.getAccount = void 0;
const user_service_1 = require("../services/user_service");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const argon2 = require("argon2");
const getAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.decode.id;
        const user = yield user_service_1.userService.findById(id);
        const buildUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({
            user: buildUser,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAccount = getAccount;
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let user;
        user = yield user_service_1.userService.findByEmail(email);
        if (user)
            throw new Error("Arleady used email!");
        if (password.length < 8)
            throw new Error("Short password!");
        const hashedPassword = yield argon2.hash(password);
        user = yield user_service_1.userService.create(name, email, hashedPassword);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const buildUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({
            user: buildUser,
            token,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createAccount = createAccount;
const updateAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.decode.id;
        const { name, email } = req.body;
        const user = yield user_service_1.userService.update(id, name, email);
        const buildUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        res.status(200).send({
            user: buildUser,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateAccount = updateAccount;
//# sourceMappingURL=account_controllers.js.map