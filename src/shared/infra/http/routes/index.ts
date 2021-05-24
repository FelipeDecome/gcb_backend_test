import { doctorsRoutes } from '@modules/doctors/infra/http/routes/doctors.routes';
import { specialtiesRoutes } from '@modules/doctors/infra/http/routes/specialties.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/doctors', doctorsRoutes);
routes.use('/specialties', specialtiesRoutes);

export { routes };
