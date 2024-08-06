import * as fs from 'fs/promises';
import * as path from 'path';
import { prompt } from 'enquirer';

export const commandCreateMiddleware = async () => {
  const { modelName } = (await prompt({
    type: 'input',
    name: 'modelName',
    message: 'Per quale modello vuoi creare il middleware?',
    initial: 'User',
  })) as any;

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
  await fs.mkdir(middlewareDir, { recursive: true });

  await fs.writeFile(path.join(middlewareDir, `${modelNameLower}.middleware.ts`), middlewareCode);

  console.log(`Middleware ${modelNameLower}.middleware.ts creato con successo!`);
};
