# Teste realizado para GCB investimentos

A proposta do teste era construir uma API para gerenciar médicos, com cadastro, busca, edição e remoção.

## Rodando a aplicação
*Certifique-se de configurar o banco de dados antes de rodar os comandos*

```console
  $ yarn typeorm:migrate

  $ yarn dev:server
```

## Ferramentas utilizadas

 - Nodejs
 - Express
 - Typescript
 - Typeorm
 - Validações com Celebrate e Joi
 - Jest
 - Postgres
 - Tsyringe para injeção de dependência.

## Configuração do insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Doctors%20Management&uri=https%3A%2F%2Fgithub.com%2FFelipeDecome%2Fgcb_backend_test%2Fblob%2Fmaster%2Fdocs%2FInsomnia_2021-05-26.json)
