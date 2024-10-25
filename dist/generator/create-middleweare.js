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
exports.commandCreateMiddleware = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const enquirer_1 = require("enquirer");
const commandCreateMiddleware = () => __awaiter(void 0, void 0, void 0, function* () {
    const { modelName } = (yield (0, enquirer_1.prompt)({
        type: 'input',
        name: 'modelName',
        message: 'Per quale modello vuoi creare il middleware?',
        initial: 'User',
    }));
    const modelNameLower = modelName.toLowerCase();
    const middlewareCode = `
import { Request, Response, NextFunction } from 'express';

export const ${modelNameLower}Middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Logica del middleware per il modello ${modelName}
    throw new Error('Not implemented');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong in the ${modelNameLower} middleware' });
  }
};
`;
    const middlewareDir = path.join(__dirname, '../middleware');
    yield fs.mkdir(middlewareDir, { recursive: true });
    yield fs.writeFile(path.join(middlewareDir, `${modelNameLower}.middleware.ts`), middlewareCode);
    console.log(`Middleware ${modelNameLower}.middleware.ts creato con successo!`);
});
exports.commandCreateMiddleware = commandCreateMiddleware;
