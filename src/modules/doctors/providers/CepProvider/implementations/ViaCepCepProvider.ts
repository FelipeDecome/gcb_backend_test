import { AppError } from '@shared/Errors/AppError';
import fetch from 'node-fetch';

import { ICepProvider, ICepResponse } from '../models/ICepProvider';

interface IViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

class ViaCepCepProvider implements ICepProvider {
  private apiURL: string;

  private apiResponseType: string;

  constructor() {
    this.apiURL = process.env.CEP_API_URL || '';
    this.apiResponseType = 'json';

    if (this.apiURL === '')
      throw new AppError(
        "You must define an enviroment variable for 'CEP_API_URL'",
      );
  }

  public async find(cep: string): Promise<ICepResponse> {
    const viaCepResponse = (await (
      await fetch(`${this.apiURL}/${cep}/${this.apiResponseType}/`)
    ).json()) as IViaCepResponse;

    return {
      cep,
      street: viaCepResponse.logradouro,
      neighborhood: viaCepResponse.bairro,
      city: viaCepResponse.localidade,
      state: viaCepResponse.uf,
    };
  }
}

export { ViaCepCepProvider };
