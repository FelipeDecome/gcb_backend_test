interface ICepResponse {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ICepProvider {
  find(cep: string): Promise<ICepResponse>;
}

export { ICepProvider, ICepResponse };
