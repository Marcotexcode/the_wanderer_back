import { Router } from 'express';
import userRoute from './routes/user.route';
import { PrismaClient } from '@prisma/client';
import authRoute from './routes/auth.route';
import characterRoute from './routes/character.route';
import locationRoute from './routes/location.route';
import structureRoute from './routes/structure.route';
import playerHomeRoute from './routes/player-home.route';

const router = Router();
const db = new PrismaClient();

playerHomeRoute(router, db);

structureRoute(router, db);

locationRoute(router, db);

characterRoute(router, db);

userRoute(router, db);

authRoute(router, db);

export default router;
