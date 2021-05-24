import { Router } from 'express';

import { SpecialtiesController } from '../controllers/SpecialtiesController';

const specialtiesRoutes = Router();
const specialtiesController = new SpecialtiesController();

specialtiesRoutes.get('/', specialtiesController.index);

export { specialtiesRoutes };
