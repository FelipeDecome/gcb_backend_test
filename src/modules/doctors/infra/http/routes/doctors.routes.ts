import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { DoctorsController } from '../controllers/DoctorsController';

const doctorsRoutes = Router();
const doctorsController = new DoctorsController();

doctorsRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().max(120).required(),
        crm: Joi.string()
          .pattern(/[0-9]{2}.[0-9]{3}.[0-9]{2}/)
          .required(),
        landline_phone: Joi.string().required(),
        cell_phone: Joi.string().required(),
        cep: Joi.string().pattern(/[0-9]{5}-[0-9]{3}/),
        specialties: Joi.array().items(Joi.string().uuid()).min(2).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  doctorsController.create,
);

doctorsRoutes.get('/', doctorsController.find);

doctorsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  doctorsController.remove,
);

export { doctorsRoutes };
