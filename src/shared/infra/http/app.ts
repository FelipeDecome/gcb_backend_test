import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '../typeorm';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { json } from 'express';

import { appErrorHandlingMiddleware } from './middleware/appErrorHandlingMiddleware';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);
app.use(errors());

app.use(appErrorHandlingMiddleware);

export { app };
