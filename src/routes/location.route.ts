import { Router, Request, Response } from 'express';
import { locationService } from '../services/location/location.service';

import { PrismaClient } from '@prisma/client';
import { LocationCreateInput, LocationUpdateInput } from '../services/location/types';

const locationRoute = (router: Router, db: PrismaClient) => {
  router.get('/location', async (req: Request, res: Response) => {
    const result = await locationService.location({
      db,
      id: req.body.id,
    });

    res.send(result);
  });

  router.get('/locations', async (req: Request, res: Response) => {
    const result = await locationService.locations({ db });
    res.send(result);
  });

  router.post('/location-create', async (req: Request, res: Response) => {
    const result = await locationService.createLocation({
      db,
      data: req.body as LocationCreateInput,
    });
    res.send(result);
  });

  router.post('/location-update', async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const result = await locationService.updateLocation({
      db,
      id: req.body.id,
      data: data as LocationUpdateInput,
    });

    res.send(result);
  });

  router.post('/location-delete', async (req: Request, res: Response) => {
    const result = await locationService.deleteLocation({
      db,
      id: req.body.id as string,
    });
    res.send(result);
  });
};

export default locationRoute;
