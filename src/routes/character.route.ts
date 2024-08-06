import { Router, Request, Response } from 'express';
import { characterService } from '../services/character/character.service';

import { PrismaClient } from '@prisma/client';

const characterRoute = (router: Router, db: PrismaClient) => {
  router.get('/character', async (req: Request, res: Response) => {
    const result = await characterService.character({
      db,
      id: req.body.id,
    });

    res.send(result);
  });

  router.get('/characters', async (req: Request, res: Response) => {
    const result = await characterService.characters({ db });
    res.send(result);
  });

  router.post('/character-create', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token non fornito' });
    }

    const result = await characterService.createCharacter({
      db,
      token,
      data: req.body,
    });
    res.send(result);
  });

  router.post('/character-update', async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const result = await characterService.updateCharacter({
      db,
      id: req.body.id,
      data: data,
    });

    res.send(result);
  });

  router.post('/character-delete', async (req: Request, res: Response) => {
    const result = await characterService.deleteCharacter({
      db,
      id: req.body.id as string,
    });
    res.send(result);
  });
};

export default characterRoute;
