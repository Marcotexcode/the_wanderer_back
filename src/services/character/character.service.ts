import { Character, PrismaClient } from '@prisma/client';
import { CharacterCreateInput, CharacterUpdateInput } from './types';
import jwt from 'jsonwebtoken';

export const characterService = {
  async character(props: { db: PrismaClient; id: string }): Promise<Character> {
    const { db, id } = props;

    return await db.character.findFirstOrThrow({
      where: {
        id,
      },
    });
  },

  async characters(props: { db: PrismaClient }): Promise<Character[]> {
    const { db } = props;

    return await db.character.findMany({});
  },

  async createCharacter(props: { db: PrismaClient; data: CharacterCreateInput; token: string }): Promise<Character> {
    const { db, data, token } = props;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decodedToken = jwt.verify(token, jwtSecret) as { userId: string };
    const userId = decodedToken.userId;

    return await db.character.create({
      data: {
        ...data,
        strength: parseInt(data.strength as unknown as string, 10),
        life: parseInt(data.life as unknown as string, 10),
        userId,
      },
    });
  },

  async updateCharacter(props: { db: PrismaClient; id: string; data: CharacterUpdateInput }): Promise<Character> {
    const { db, data, id } = props;

    return await db.character.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteCharacter(props: { db: PrismaClient; id: string }): Promise<Character> {
    const { db, id } = props;

    return await db.character.delete({
      where: {
        id,
      },
    });
  },
};
