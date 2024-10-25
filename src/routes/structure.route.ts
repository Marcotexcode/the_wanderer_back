import { Router, Request, Response } from 'express';
import { structureService } from '../services/structure/structure.service';

import { PrismaClient } from '@prisma/client';
import { StructureCreateInput, StructureUpdateInput } from '../services/structure/types';
import { getUserIdFromToken } from '../services/utilities';

const structureRoute = (router: Router, db: PrismaClient) => {
  router.get('/structure', async (req: Request, res: Response) => {
    const result = await structureService.structure({
      db,
      id: req.body.id,
    });

    res.send(result);
  });

  router.get('/structures', async (req: Request, res: Response) => {
    const result = await structureService.structures({ db });
    res.send(result);
  });

  router.post('/structure-create', async (req: Request, res: Response) => {
    const userId = await getUserIdFromToken(req)

    const result = await structureService.createStructure({
      db,
      data: req.body as StructureCreateInput,
      userId
    });
    res.send(result);
  });

  router.post('/structure-update', async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const result = await structureService.updateStructure({
      db,
      id: req.body.id,
      data: data as StructureUpdateInput,
    });

    res.send(result);
  });

  router.post('/structure-delete', async (req: Request, res: Response) => {
    const result = await structureService.deleteStructure({
      db,
      id: req.body.id as string,
    });
    res.send(result);
  });
};

export default structureRoute;
