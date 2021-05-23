import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './routes';
import { appErrorHandlingMiddleware } from './middleware/appErrorHandlingMiddleware';
import '../typeorm';

const app = express();

app.use(cors());
app.use(routes);

app.use(appErrorHandlingMiddleware);

export { app };
