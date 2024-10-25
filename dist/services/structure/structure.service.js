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
exports.structureService = void 0;
exports.structureService = {
    structure(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.structure.findFirstOrThrow({
                where: {
                    id,
                },
            });
        });
    },
    structures(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = props;
            return yield db.structure.findMany({});
        });
    },
    createStructure(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data } = props;
            console.log('wwwwwwww');
            return yield db.structure.create({
                data,
            });
        });
    },
    updateStructure(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, id } = props;
            return yield db.structure.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    deleteStructure(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.structure.delete({
                where: {
                    id,
                },
            });
        });
    },
};
