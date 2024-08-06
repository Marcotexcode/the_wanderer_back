import * as fs from 'fs/promises';
import * as path from 'path';

export const commandCreateService = async (serviceName: string) => {
  const serviceNameLower = serviceName.toLowerCase();

  const serviceNameUpper = serviceNameLower.charAt(0).toUpperCase() + serviceNameLower.slice(1);

  const serverCode = `
import { ${serviceNameUpper}, PrismaClient } from '@prisma/client';
import { ${serviceNameUpper}CreateInput, ${serviceNameUpper}UpdateInput } from './types';

export const ${serviceNameLower}Service = {
    async ${serviceNameLower}(props: {db: PrismaClient, id:string}): Promise<${serviceNameUpper}> {
    const {db, id} = props

    return await db.${serviceNameLower}.findFirstOrThrow({
        where:{
            id
        }
    })
    },

    async ${serviceNameLower}s(props: {db: PrismaClient}): Promise<${serviceNameUpper}[]> {
        const {db} = props

        return await db.${serviceNameLower}.findMany({})
    },

    async create${serviceNameUpper}(props: {
        db: PrismaClient
        data: ${serviceNameUpper}CreateInput
    }): Promise<${serviceNameUpper}> {

        const {db, data} = props;

        return await db.${serviceNameLower}.create({
            data
        });
    },

    async update${serviceNameUpper}(props: {
        db: PrismaClient
        id: string
        data: ${serviceNameUpper}UpdateInput
    }): Promise<${serviceNameUpper}> {

        const {db, data, id} = props;

        return await db.${serviceNameLower}.update({
            where: {
                id
            },
            data
        });
    },

    async delete${serviceNameUpper}(props: {
        db: PrismaClient
        id: string
    }): Promise<${serviceNameUpper}> {
        const {db,  id} = props;

        return await db.${serviceNameLower}.delete({
            where: {
                id
            },
        });

    }
};
    `;

  const serviceDir = path.join(__dirname, '../services/', serviceNameLower);
  await fs.mkdir(serviceDir);

  await fs.writeFile(
    path.join(__dirname, `../services/${serviceNameLower}/${serviceNameLower}.service.ts`),
    serverCode,
  );
};
