import { doctorsRoutes } from '@modules/doctors/infra/http/routes/doctors.routes';
import { Router } from 'express';

const routes = Router();

routes.use(doctorsRoutes);

export { routes };
