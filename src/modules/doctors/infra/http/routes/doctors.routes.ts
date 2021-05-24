import { Router } from 'express';

import { DoctorsController } from '../controllers/DoctorsController';

const doctorsRoutes = Router();
const doctorsController = new DoctorsController();

doctorsRoutes.post('/', doctorsController.create);

export { doctorsRoutes };
