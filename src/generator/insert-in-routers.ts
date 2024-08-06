import * as fs from 'fs/promises';
import * as path from 'path';

export const commandInsertInRouter = async (routeNameUpper: string, routeNameLower: string) => {
  // Definisce il codice del server come una stringa di importazione per la rotta specificata
  const serverCode = `import ${routeNameLower}Route from './routes/${routeNameLower}.route';`;

  // Costruisce il percorso del file schema unendo il percorso corrente e '../routes.ts'
  const schemaFilePath = path.join(__dirname, '../routes.ts');

  // Legge il contenuto del file schema come stringa
  const currentSchema = await fs.readFile(schemaFilePath, 'utf-8');

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
  await fs.writeFile(schemaFilePath, updatedSchema);
};
