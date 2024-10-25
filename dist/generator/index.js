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
const create_model_1 = require("./create-model");
const create_route_1 = require("./create-route");
const create_middleweare_1 = require("./create-middleweare");
const args = process.argv.slice(2);
(() => __awaiter(void 0, void 0, void 0, function* () {
    switch (args[0]) {
        case 'createRoute':
            yield (0, create_route_1.commandCreateRoute)();
            break;
        case 'createModel':
            yield (0, create_model_1.commandCreateModel)();
            break;
        case 'createMiddleware':
            yield (0, create_middleweare_1.commandCreateMiddleware)();
            break;
        default:
            console.error('Comando non valido.');
            break;
    }
}))();
