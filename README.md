# Como usar

1. Primeiro clone o projeto `git clone git@gitlab.com:maxscalla/esqueleto-web-vite.git`;
2. Depois remova o arquivo .git `rm -rf .git`;
3. E agora é so começar a fazer seu projeto com base no esqueleto;

## ATENÇÃO

Esse é o esqueleto (layout base) para as próximas APIs da maxscalla, lembre-se de alterar os dados de conexão **(em ambiente de desenvolvimento usar um banco de dados local)**.

Lembre-se também que se você tentar usar uma porta ja usada no servidor vai dar erro, então fique de olho nisso.

## Configurações necessárias

Server.ts
.env

- Use o .env.example apenas como base para criar o .env separadamente no ambiente de produção

## Build

```
yarn build
```

## Desenvolvimento

```
yarn dev
```

# .ENV

Para que funcione lembre-se de colocar VITE\_ antes de qualquer env. Exemplo: VITE_PORT
