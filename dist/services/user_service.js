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
exports.userService = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
exports.userService = {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const allUsers = yield repo.find();
            return allUsers;
        });
    },
    create(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = repo.create({ name, email, password });
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0)
                throw new Error(errors.map((error) => Object.values(error.constraints || {})).join(","));
            yield repo.save(user);
            return user;
        });
    },
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOne({ where: { email } });
            const errors = yield (0, class_validator_1.validate)(user);
            return user;
        });
    },
    update(id, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            yield repo.update(id, { name, email });
            const user = yield repo.findOne({ where: { id } });
            return user;
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield repo.findOne({ where: { id } });
            return user;
        });
    },
};
//# sourceMappingURL=user_service.js.map