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
exports.commandCreateModel = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const enquirer_1 = require("enquirer");
const child_process_1 = require("child_process");
const commandCreateModel = () => __awaiter(void 0, void 0, void 0, function* () {
    const { modelName } = (yield (0, enquirer_1.prompt)({
        type: 'input',
        name: 'modelName',
        message: 'Come vuoi chiamare il modello?',
        initial: 'new-node-project',
    }));
    const modelNameLower = modelName.toLowerCase();
    const modelNameUpper = modelNameLower.charAt(0).toUpperCase() + modelNameLower.slice(1);
    const fields = [];
    while (true) {
        const { fieldName } = (yield (0, enquirer_1.prompt)({
            type: 'input',
            name: 'fieldName',
            message: 'Inserisci il nome di un campo (lascia vuoto per terminare):',
            initial: '',
        }));
        if (!fieldName)
            break;
        const { fieldType } = (yield (0, enquirer_1.prompt)({
            type: 'input',
            name: 'fieldType',
            message: `Inserisci il tipo del campo "${fieldName}":`,
            initial: 'String',
        }));
        const { isUnique } = (yield (0, enquirer_1.prompt)({
            type: 'confirm',
            name: 'isUnique',
            message: `Il campo "${fieldName}" sarà unico?`,
            initial: false,
        }));
        const { isRequired } = (yield (0, enquirer_1.prompt)({
            type: 'confirm',
            name: 'isRequired',
            message: `Il campo "${fieldName}" è obbligatorio?`,
            initial: false,
        }));
        const { defaultValue } = (yield (0, enquirer_1.prompt)({
            type: 'input',
            name: 'defaultValue',
            message: `Inserisci il valore di default per il campo "${fieldName}": (lascia vuoto se non necessario)`,
            initial: '',
        }));
        const fieldTypeLower = fieldType.toLowerCase();
        const fieldTypeUpper = fieldTypeLower.charAt(0).toUpperCase() + fieldTypeLower.slice(1);
        fields.push({
            name: fieldName,
            type: fieldTypeUpper,
            unique: isUnique,
            required: isRequired,
            defaultValue,
        });
    }
    const modelCode = `
              model ${modelNameUpper} {
                  id       String  @id @default(auto()) @map("_id") @db.ObjectId
      ${fields
        .map((field) => `            ${field.name}       ${field.type}${field.required ? '' : '?'}${field.unique ? ' @unique' : ''}${field.defaultValue ? ` @default(${field.defaultValue})` : ''}`)
        .join('\n')}
              }
          `.trim();
    const schemaFilePath = path.join(__dirname, '../../prisma/schema.prisma');
    // Read the current content of the Prisma schema
    const currentSchema = yield fs.readFile(schemaFilePath, 'utf-8');
    // Add the new model to the end of the current Prisma schema
    const updatedSchema = currentSchema.trim() + '\n\n' + modelCode + '\n\n';
    yield (0, child_process_1.exec)('npx prisma generate', { cwd: __dirname });
    // Overwrite the Prisma schema file with the updated schema
    yield fs.writeFile(schemaFilePath, updatedSchema);
});
exports.commandCreateModel = commandCreateModel;
