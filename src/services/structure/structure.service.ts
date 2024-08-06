import { Structure, PrismaClient } from '@prisma/client';
import { StructureCreateInput, StructureUpdateInput } from './types';

export const structureService = {
  async structure(props: { db: PrismaClient; id: string }): Promise<Structure> {
    const { db, id } = props;

    return await db.structure.findFirstOrThrow({
      where: {
        id,
      },
    });
  },

  async structures(props: { db: PrismaClient }): Promise<Structure[]> {
    const { db } = props;

    return await db.structure.findMany({});
  },

  async createStructure(props: { db: PrismaClient; data: StructureCreateInput }): Promise<Structure> {
    const { db, data } = props;

    return await db.structure.create({
      data,
    });
  },

  async updateStructure(props: { db: PrismaClient; id: string; data: StructureUpdateInput }): Promise<Structure> {
    const { db, data, id } = props;

    return await db.structure.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteStructure(props: { db: PrismaClient; id: string }): Promise<Structure> {
    const { db, id } = props;

    return await db.structure.delete({
      where: {
        id,
      },
    });
  },
};
