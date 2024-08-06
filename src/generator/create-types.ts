import * as fs from 'fs/promises';
import * as path from 'path';

export const commandCreateTypes = async (typeName: string) => {
  const typeNameLower = typeName.toLowerCase();

  const typeNameUpper = typeNameLower.charAt(0).toUpperCase() + typeNameLower.slice(1);

  // Leggere il schema.prisma per recuperare il modello che mi serve

  const schemaFilePath = path.join(__dirname, '../../prisma/schema.prisma');

  // Read the current content of the Prisma schema
  const currentSchema = await fs.readFile(schemaFilePath, 'utf-8');

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

  await fs.writeFile(path.join(__dirname, `../services/${typeNameLower}/types.ts`), serverCode);
};
