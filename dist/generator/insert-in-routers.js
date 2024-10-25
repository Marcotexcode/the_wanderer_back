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
exports.commandInsertInRouter = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const commandInsertInRouter = (routeNameUpper, routeNameLower) => __awaiter(void 0, void 0, void 0, function* () {
    // Definisce il codice del server come una stringa di importazione per la rotta specificata
    const serverCode = `import ${routeNameLower}Route from './routes/${routeNameLower}.route';`;
    // Costruisce il percorso del file schema unendo il percorso corrente e '../routes.ts'
    const schemaFilePath = path.join(__dirname, '../routes.ts');
    // Legge il contenuto del file schema come stringa
    const currentSchema = yield fs.readFile(schemaFilePath, 'utf-8');
    // Divide il contenuto del file schema in righe
    const lines = currentSchema.split('\n');
    // Filtra le righe che iniziano con 'import'
    const importLines = lines.filter((line) => line.startsWith('import'));
    // Filtra le righe che non iniziano con 'import'
    const otherLines = lines.filter((line) => !line.startsWith('import'));
    // Crea una nuova stringa di importazioni aggiungendo il codice del server alle importazioni esistenti
    const updatedImportLines = [...importLines, serverCode].join('\n');
    // Crea una copia delle altre righe
    const updatedOtherLines = [...otherLines];
    // Trova l'indice della riga che contiene 'const router'
    const routerIndex = updatedOtherLines.findIndex((line) => line.includes('const router'));
    // Inserisce la chiamata alla rotta specificata dopo 'const router'
    updatedOtherLines.splice(routerIndex + 2, 0, `\n${routeNameLower}Route(router, db);`);
    // Crea una nuova stringa combinando le importazioni aggiornate e le altre righe aggiornate
    const updatedSchema = `${updatedImportLines}\n\n${updatedOtherLines.join('\n')}`;
    // Scrive il contenuto aggiornato nel file schema
    yield fs.writeFile(schemaFilePath, updatedSchema);
});
exports.commandInsertInRouter = commandInsertInRouter;
