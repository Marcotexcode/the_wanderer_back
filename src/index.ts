import express, { Application } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app: Application = express();
app.use(cors());
app.use(express.json());

const port = 3001;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta localhost:${port}`);
});
