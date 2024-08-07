import { Router, Request, Response } from 'express';
import { playerHomeService } from '../services/player-home/playerhome.service';

import { PrismaClient } from '@prisma/client';
import { PlayerHomeCreateInput, PlayerHomeUpdateInput } from '../services/player-home/types';
import { getUserIdFromToken } from '../services/utilities';

const playerHomeRoute = (router: Router, db: PrismaClient) => {
  router.get('/playerHome', async (req: Request, res: Response) => {
    const result = await playerHomeService.playerHome({
      db,
      id: req.body.id,
    });

    res.send(result);
  });

  router.get('/playerHomes', async (req: Request, res: Response) => {
    const result = await playerHomeService.playerHomes({ db });
    res.send(result);
  });

  router.get('/get-player-home-and-structure', async (req: Request, res: Response) => {
    const decodedToken = await getUserIdFromToken(req);

    const result = await playerHomeService.getPlayerHomeAndStructure({ db, userId: decodedToken });
    res.send(result);
  });

  router.post('/playerHome-create', async (req: Request, res: Response) => {
    const result = await playerHomeService.createPlayerHome({
      db,
      data: req.body as PlayerHomeCreateInput,
    });
    res.send(result);
  });

  router.post('/playerHome-update', async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const result = await playerHomeService.updatePlayerHome({
      db,
      id: req.body.id,
      data: data as PlayerHomeUpdateInput,
    });

    res.send(result);
  });

  router.post('/playerHome-delete', async (req: Request, res: Response) => {
    const result = await playerHomeService.deletePlayerHome({
      db,
      id: req.body.id as string,
    });
    res.send(result);
  });
};

export default playerHomeRoute;
