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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user/user.service");
const userRoute = (router, db) => {
    router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_service_1.userService.user({
            db,
            id: req.body.id,
        });
        res.send(result);
    }));
    router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_service_1.userService.users({ db });
        res.send(result);
    }));
    router.post('/user-create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_service_1.userService.createUser({
            db,
            data: req.body,
        });
        res.send(result);
    }));
    router.post('/user-update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
        const result = yield user_service_1.userService.updateUser({
            db,
            id: req.body.id,
            data: data,
        });
        res.send(result);
    }));
    router.post('/user-delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_service_1.userService.deleteUser({
            db,
            id: req.body.id,
        });
        res.send(result);
    }));
};
exports.default = userRoute;
