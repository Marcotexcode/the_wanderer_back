"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.commandCreateRoute = void 0;
const enquirer_1 = require("enquirer");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const create_service_1 = require("./create-service");
const create_types_1 = require("./create-types");
const insert_in_routers_1 = require("./insert-in-routers");
const commandCreateRoute = () => __awaiter(void 0, void 0, void 0, function* () {
    const { routeName } = (yield (0, enquirer_1.prompt)({
        type: 'input',
        name: 'routeName',
        message: 'Come vuoi chiamare la tua rotta?',
        initial: 'new-node-project',
    }));
    const routeNameLower = routeName.toLowerCase();
    const routeNameUpper = routeNameLower.charAt(0).toUpperCase() + routeNameLower.slice(1);
    const serverCode = `
import { Router, Request, Response } from 'express';
import { ${routeNameLower}Service } from '../services/${routeNameLower}/${routeNameLower}.service';

import { PrismaClient } from '@prisma/client';
import { ${routeNameUpper}CreateInput, ${routeNameUpper}UpdateInput } from '../services/${routeNameLower}/types';

const ${routeNameLower}Route = (router: Router, db: PrismaClient) => {

  router.get('/${routeNameLower}', async (req: Request, res: Response) => {
    const result = await ${routeNameLower}Service.${routeNameLower}({
        db,
        id: req.body.id
    });

    res.send(result);
  });

    router.get('/${routeNameLower}s', async (req: Request, res: Response) => {
        const result = await ${routeNameLower}Service.${routeNameLower}s({db});
        res.send(result);
    });

    router.post('/${routeNameLower}-create', async (req: Request, res: Response) => {

        const result = await ${routeNameLower}Service.create${routeNameUpper}({
            db,
            data: req.body as ${routeNameUpper}CreateInput
        });
        res.send(result);
    });

    router.post('/${routeNameLower}-update', async (req: Request, res: Response) => {
        const { id, ...data } = req.body;

        const result = await ${routeNameLower}Service.update${routeNameUpper}({
            db,
            id: req.body.id,
            data: data as ${routeNameUpper}UpdateInput
        });

        res.send(result);
        
                        });

    router.post('/${routeNameLower}-delete', async (req: Request, res: Response) => {
        const result = await ${routeNameLower}Service.delete${routeNameUpper}({
            db,
            id: req.body.id as string
        });
        res.send(result);
    });
}

export default ${routeNameLower}Route;
  `;
    yield (0, create_service_1.commandCreateService)(routeNameLower);
    yield (0, create_types_1.commandCreateTypes)(routeName);
    yield (0, insert_in_routers_1.commandInsertInRouter)(routeNameUpper, routeNameLower);
    yield fs.writeFile(path.join(__dirname, `../routes/${routeNameLower}.route.ts`), serverCode);
});
exports.commandCreateRoute = commandCreateRoute;
