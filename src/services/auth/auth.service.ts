import { User, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from '../user/user.service';
import { LoginInput, RegisterInput } from './types';

export const authService = {
  async login(props: { db: PrismaClient; data: LoginInput }): Promise<{ user: User; token: string } | null> {
    const { db, data } = props;
    const { email, password } = data;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    return { user, token };
  },

  async register(props: { db: PrismaClient; data: RegisterInput }): Promise<{ user: User; token: string } | null> {
    const { db, data } = props;

    const user = await userService.createUser({
      db,
      data,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    return { user, token };
  },
};
