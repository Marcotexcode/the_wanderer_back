import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authService } from '../services/auth/auth.service';

const authRoute = (router: Router, db: PrismaClient) => {
  router.post('/login', async (req: Request, res: Response) => {
    const result = await authService.login({
      db,
      data: req.body,
    });
    res.send(result);
  });

  router.post('/register', async (req: Request, res: Response) => {
    const result = await authService.register({
      db,
      data: req.body,
    });
    res.send(result);
  });
};

export default authRoute;
