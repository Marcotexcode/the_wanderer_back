import * as fs from 'fs/promises';
import * as path from 'path';
import { prompt } from 'enquirer';
import { exec } from 'child_process';

interface Field {
  name: string;
  type: string;
  unique?: boolean;
  required?: boolean;
  defaultValue?: string;
}

export const commandCreateModel = async () => {
  const { modelName } = (await prompt({
    type: 'input',
    name: 'modelName',
    message: 'Come vuoi chiamare il modello?',
    initial: 'new-node-project',
  })) as any;

  const modelNameLower = modelName.toLowerCase();
  const modelNameUpper = modelNameLower.charAt(0).toUpperCase() + modelNameLower.slice(1);
  const fields: Field[] = [];

  while (true) {
    const { fieldName } = (await prompt({
      type: 'input',
      name: 'fieldName',
      message: 'Inserisci il nome di un campo (lascia vuoto per terminare):',
      initial: '',
    })) as any;

    if (!fieldName) break;

    const { fieldType } = (await prompt({
      type: 'input',
      name: 'fieldType',
      message: `Inserisci il tipo del campo "${fieldName}":`,
      initial: 'String',
    })) as any;

    const { isUnique } = (await prompt({
      type: 'confirm',
      name: 'isUnique',
      message: `Il campo "${fieldName}" sarà unico?`,
      initial: false,
    })) as any;

    const { isRequired } = (await prompt({
      type: 'confirm',
      name: 'isRequired',
      message: `Il campo "${fieldName}" è obbligatorio?`,
      initial: false,
    })) as any;

    const { defaultValue } = (await prompt({
      type: 'input',
      name: 'defaultValue',
      message: `Inserisci il valore di default per il campo "${fieldName}": (lascia vuoto se non necessario)`,
      initial: '',
    })) as any;

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
        .map(
          (field) =>
            `            ${field.name}       ${field.type}${
              field.required ? '' : '?'
            }${field.unique ? ' @unique' : ''}${field.defaultValue ? ` @default(${field.defaultValue})` : ''}`,
        )
        .join('\n')}
              }
          `.trim();

  const schemaFilePath = path.join(__dirname, '../../prisma/schema.prisma');

  // Read the current content of the Prisma schema
  const currentSchema = await fs.readFile(schemaFilePath, 'utf-8');

  // Add the new model to the end of the current Prisma schema
  const updatedSchema = currentSchema.trim() + '\n\n' + modelCode + '\n\n';

  await exec('npx prisma generate', { cwd: __dirname });

  // Overwrite the Prisma schema file with the updated schema
  await fs.writeFile(schemaFilePath, updatedSchema);
};
