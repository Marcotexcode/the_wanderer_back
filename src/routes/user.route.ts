import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services/user/user.service';
import { PrismaClient } from '@prisma/client';
import { UserCreateInput, UserUpdateInput } from '../services/user/types';

const userRoute = (router: Router, db: PrismaClient) => {
  router.get('/user', async (req: Request, res: Response) => {
    const result = await userService.user({
      db,
      id: req.body.id,
    });

    res.send(result);
  });

  router.get('/users', async (req: Request, res: Response) => {
    const result = await userService.users({ db });
    res.send(result);
  });

  router.post('/user-create', async (req: Request, res: Response) => {
    const result = await userService.createUser({
      db,
      data: req.body as UserCreateInput,
    });
    res.send(result);
  });

  router.post('/user-update', async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const result = await userService.updateUser({
      db,
      id: req.body.id,
      data: data as UserUpdateInput,
    });

    res.send(result);
  });

  router.post('/user-delete', async (req: Request, res: Response) => {
    const result = await userService.deleteUser({
      db,
      id: req.body.id as string,
    });
    res.send(result);
  });
};

export default userRoute;
