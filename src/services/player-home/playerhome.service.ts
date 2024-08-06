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
