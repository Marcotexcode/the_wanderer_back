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
exports.locationService = void 0;
exports.locationService = {
    location(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.location.findFirstOrThrow({
                where: {
                    id,
                },
            });
        });
    },
    locations(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = props;
            return yield db.location.findMany({});
        });
    },
    createLocation(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data } = props;
            return yield db.location.create({
                data,
            });
        });
    },
    updateLocation(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, id } = props;
            return yield db.location.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    deleteLocation(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.location.delete({
                where: {
                    id,
                },
            });
        });
    },
};
