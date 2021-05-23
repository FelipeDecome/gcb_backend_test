import { ICepProvider, ICepResponse } from '../models/ICepProvider';

class FakeCepProvider implements ICepProvider {
  public async find(cep: string): Promise<ICepResponse> {
    return {
      cep,
      street: 'street',
      city: 'city',
      neighborhood: 'neighborhood',
      state: 'ST',
    };
  }
}

export { FakeCepProvider };
