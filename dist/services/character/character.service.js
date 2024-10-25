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
exports.characterService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.characterService = {
    character(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.character.findFirstOrThrow({
                where: {
                    id,
                },
            });
        });
    },
    characters(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db } = props;
            return yield db.character.findMany({});
        });
    },
    createCharacter(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, token } = props;
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET is not defined');
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
            const userId = decodedToken.userId;
            console.log('AAAAAAAAAAAAAAAAAAAAAAAaaaa');
            yield db.playerHome
                .create({
                data: {
                    userId,
                    name: `Casa di ${data.name}`,
                    x: 836.27,
                    y: 531.89,
                    description: 'String',
                    image: 'String',
                    structureIds: [],
                },
            })
                .catch((error) => {
                console.error('Errore durante la creazione del playerHome:', error);
            });
            return yield db.character.create({
                data: Object.assign(Object.assign({}, data), { strength: parseInt(data.strength, 10), life: parseInt(data.life, 10), userId }),
            });
        });
    },
    updateCharacter(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, data, id } = props;
            return yield db.character.update({
                where: {
                    id,
                },
                data,
            });
        });
    },
    deleteCharacter(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { db, id } = props;
            return yield db.character.delete({
                where: {
                    id,
                },
            });
        });
    },
};
