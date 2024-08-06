import { User, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserCreateInput, UserUpdateInput } from './types';

export const userService = {
  async user(props: { db: PrismaClient; id: string }): Promise<User> {
    const { db, id } = props;

    return await db.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  },

  async users(props: { db: PrismaClient }): Promise<User[]> {
    const { db } = props;

    return await db.user.findMany({});
  },

  async createUser(props: { db: PrismaClient; data: UserCreateInput }): Promise<User> {
    const { db, data } = props;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },

  async updateUser(props: { db: PrismaClient; id: string; data: UserUpdateInput }): Promise<User> {
    const { db, data, id } = props;

    return await db.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteUser(props: { db: PrismaClient; id: string }): Promise<User> {
    const { db, id } = props;

    return await db.user.delete({
      where: {
        id,
      },
    });
  },
};
