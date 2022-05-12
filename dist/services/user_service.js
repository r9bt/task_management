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
exports.userService = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const error_1 = __importDefault(require("../error/error"));
exports.userService = {
    create(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = repo.create({ name, email, password });
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                console.log(errors.map((error) => Object.values(error.constraints || {})).join(","));
                throw new error_1.default(400, "正しいメールアドレスを入力してください。");
            }
            yield repo.save(user);
            return user;
        });
    },
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(User_1.User);
                const user = yield repo.findOneOrFail({ where: { email } });
                return user;
            }
            catch (error) {
                return null;
            }
        });
    },
    update(id, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            let user;
            user = yield repo.findOneOrFail({ where: { id } });
            user.name = name;
            user.email = email;
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                console.log(errors.map((error) => Object.values(error.constraints || {})).join(","));
                throw new error_1.default(400, "正しいメールアドレスを入力してください。");
            }
            yield repo.update(id, { name, email });
            return user;
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(User_1.User);
                const user = yield repo.findOneOrFail({ where: { id } });
                return user;
            }
            catch (error) {
                return null;
            }
        });
    },
};
//# sourceMappingURL=user_service.js.map