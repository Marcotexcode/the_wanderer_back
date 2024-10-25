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
exports.commandCreateTypes = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const commandCreateTypes = (typeName) => __awaiter(void 0, void 0, void 0, function* () {
    const typeNameLower = typeName.toLowerCase();
    const typeNameUpper = typeNameLower.charAt(0).toUpperCase() + typeNameLower.slice(1);
    // Leggere il schema.prisma per recuperare il modello che mi serve
    const schemaFilePath = path.join(__dirname, '../../prisma/schema.prisma');
    // Read the current content of the Prisma schema
    const currentSchema = yield fs.readFile(schemaFilePath, 'utf-8');
    const regex = new RegExp(`model ${typeNameUpper}\\s*{([^}]*)}`, 's');
    const match = currentSchema.match(regex);
    let userFields;
    if (match) {
        userFields = match[1]
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line && !line.startsWith('//'))
            .map((line) => {
            const parts = line.split(/\s+/);
            return {
                name: parts[0],
                type: parts[1],
            };
        });
    }
    let serverCode = '';
    if (userFields) {
        userFields.shift();
        serverCode = `
    export interface ${typeNameUpper} {
      ${userFields
            .map((field) => {
            if (field.type.includes('?')) {
                return `${field.name}?: ${field.type.slice(0, -1).toLowerCase()}| null | undefined;`;
            }
            return `${field.name}: ${field.type.toLowerCase()};`;
        })
            .join('\n  ')}
    }

    export interface ${typeNameUpper}CreateInput {
      ${userFields
            .map((field) => {
            if (field.type.includes('?')) {
                return `${field.name}?: ${field.type.slice(0, -1).toLowerCase()}| null | undefined;`;
            }
            return `${field.name}: ${field.type.toLowerCase()};`;
        })
            .join('\n  ')}
    }

    export interface ${typeNameUpper}UpdateInput {
      ${userFields
            .map((field) => {
            if (field.type.includes('?')) {
                return `${field.name}?: ${field.type.slice(0, -1).toLowerCase()} | null | undefined;`;
            }
            return `${field.name}: ${field.type.toLowerCase()};`;
        })
            .join('\n  ')}
    }
    `;
    }
    yield fs.writeFile(path.join(__dirname, `../services/${typeNameLower}/types.ts`), serverCode);
});
exports.commandCreateTypes = commandCreateTypes;
