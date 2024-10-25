import { PlayerHome, PrismaClient } from '@prisma/client';
import { PlayerHomeCreateInput, PlayerHomeUpdateInput } from './types';

export const playerHomeService = {
  async playerHome(props: { db: PrismaClient; id: string }): Promise<PlayerHome> {
    const { db, id } = props;

    return await db.playerHome.findFirstOrThrow({
      where: {
        id,
      },
    });
  },

  async getPlayerHomeAndStructure(props: { db: PrismaClient; userId: string }): Promise<any> {
    const { db, userId } = props;

    //TODO aggiungere il recupero delle sructure
    const structures = await db.structure.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });

    const playerHome = await db.playerHome.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });

    return {
      structures,
      playerHome
    }
  },

  async playerHomes(props: { db: PrismaClient }): Promise<PlayerHome[]> {
    const { db } = props;

    return await db.playerHome.findMany({});
  },

  async createPlayerHome(props: { db: PrismaClient; data: PlayerHomeCreateInput }): Promise<PlayerHome> {
    const { db, data } = props;

    return await db.playerHome.create({
      data,
    });
  },

  async updatePlayerHome(props: { db: PrismaClient; id: string; data: PlayerHomeUpdateInput }): Promise<PlayerHome> {
    const { db, data, id } = props;

    return await db.playerHome.update({
      where: {
        id,
      },
      data,
    });
  },

  async deletePlayerHome(props: { db: PrismaClient; id: string }): Promise<PlayerHome> {
    const { db, id } = props;

    return await db.playerHome.delete({
      where: {
        id,
      },
    });
  },
};
