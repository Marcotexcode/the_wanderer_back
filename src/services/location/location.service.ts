import { Location, PrismaClient } from '@prisma/client';
import { LocationCreateInput, LocationUpdateInput } from './types';

export const locationService = {
  async location(props: { db: PrismaClient; id: string }): Promise<Location> {
    const { db, id } = props;

    return await db.location.findFirstOrThrow({
      where: {
        id,
      },
    });
  },

  async locations(props: { db: PrismaClient }): Promise<Location[]> {
    const { db } = props;

    return await db.location.findMany({});
  },

  async createLocation(props: { db: PrismaClient; data: LocationCreateInput }): Promise<Location> {
    const { db, data } = props;

    return await db.location.create({
      data,
    });
  },

  async updateLocation(props: { db: PrismaClient; id: string; data: LocationUpdateInput }): Promise<Location> {
    const { db, data, id } = props;

    return await db.location.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteLocation(props: { db: PrismaClient; id: string }): Promise<Location> {
    const { db, id } = props;

    return await db.location.delete({
      where: {
        id,
      },
    });
  },
};
