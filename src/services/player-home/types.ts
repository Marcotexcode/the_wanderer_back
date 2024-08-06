import { PlayerHome, PrismaClient } from '@prisma/client';

export type PlayerHomeCreateInput = {
  name: string;
  userId: string;
  x: number;
  y: number;
  description: string;
  image: string;
  structureIds: string[];
};

export type PlayerHomeUpdateInput = {
  name?: string;
  x?: number;
  y?: number;
  description?: string;
  image?: string;
  structureIds?: string[];
};
