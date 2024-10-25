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
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userService = {
    user(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.user.findFirstOrThrow({
                where: {
                    id,
                },
            });
        });
    },
    users(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = props;
            return yield db.user.findMany({});
        });
    },
    createUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data } = props;
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            return yield db.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
        });
    },
    updateUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, id } = props;
            return yield db.user.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    deleteUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.user.delete({
                where: {
                    id,
                },
            });
        });
    },
};
