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
exports.updateUser = exports.login = exports.register = exports.fetchAllUsers = void 0;
const user_service_1 = require("../services/user_service");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const fetchAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userService.fetchAll();
        res.status(200).send({ users: users });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.fetchAllUsers = fetchAllUsers;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield user_service_1.userService.register(name, email, password);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = res.locals.id;
        console.log(decode.id);
        const user = yield user_service_1.userService.findOne(decode.id);
        const token = res.locals.token;
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = yield user_service_1.userService.update(Number(id), name, email);
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=user_controllers.js.map