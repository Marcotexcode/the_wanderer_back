import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (req: Request): string => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new Error('Token mancante');
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const decoded = jwt.verify(token, jwtSecret) as { userId: string };

  if (!decoded.userId) {
    throw new Error('UserId non presente nel token');
  }

  return decoded.userId;
};
