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
exports.playerHomeService = void 0;
exports.playerHomeService = {
    playerHome(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.playerHome.findFirstOrThrow({
                where: {
                    id,
                },
            });
        });
    },
    getPlayerHomeAndStructure(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, userId } = props;
            //TODO aggiungere il recupero delle sructure
            return yield db.playerHome.findFirstOrThrow({
                where: {
                    userId: userId,
                },
            });
        });
    },
    playerHomes(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = props;
            return yield db.playerHome.findMany({});
        });
    },
    createPlayerHome(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data } = props;
            return yield db.playerHome.create({
                data,
            });
        });
    },
    updatePlayerHome(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, id } = props;
            return yield db.playerHome.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    deletePlayerHome(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.playerHome.delete({
                where: {
                    id,
                },
            });
        });
    },
};
