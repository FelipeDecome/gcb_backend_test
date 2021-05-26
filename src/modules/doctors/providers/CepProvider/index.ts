import { container } from 'tsyringe';

import { ViaCepCepProvider } from './implementations/ViaCepCepProvider';
import { ICepProvider } from './models/ICepProvider';

container.registerSingleton<ICepProvider>('CepProvider', ViaCepCepProvider);
