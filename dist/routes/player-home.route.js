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
const playerhome_service_1 = require("../services/player-home/playerhome.service");
const playerHomeRoute = (router, db) => {
    router.get('/playerHome', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield playerhome_service_1.playerHomeService.playerHome({
            db,
            id: req.body.id,
        });
        res.send(result);
    }));
    router.get('/playerHomes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield playerhome_service_1.playerHomeService.playerHomes({ db });
        res.send(result);
    }));
    router.get('/get-player-home-and-structure', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //const decodedToken = await getUserIdFromToken(req);
        const result = yield playerhome_service_1.playerHomeService.getPlayerHomeAndStructure({ db, userId: '66c0abb4618c477598c8b988' });
        res.send(result);
    }));
    router.post('/playerHome-create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield playerhome_service_1.playerHomeService.createPlayerHome({
            db,
            data: req.body,
        });
        res.send(result);
    }));
    router.post('/playerHome-update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
        const result = yield playerhome_service_1.playerHomeService.updatePlayerHome({
            db,
            id: req.body.id,
            data: data,
        });
        res.send(result);
    }));
    router.post('/playerHome-delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield playerhome_service_1.playerHomeService.deletePlayerHome({
            db,
            id: req.body.id,
        });
        res.send(result);
    }));
};
exports.default = playerHomeRoute;
