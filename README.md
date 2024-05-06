# Orders - microservice

## Installation

```bash
npm install
```

## 🚀Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 💎Prisma - Migraciones

```sh
# Instalar el Cliente de Prisma
npm install @prisma/client

# Configura e inicializa Prisma en el proyecto
npx prisma init

# Ejecutar las migraciones y crear la base de datos
npx prisma migrate dev

# Generar una nueva migración
npx prisma migrate dev --name MigrationName
```

## 🐳 Docker

Levantar la base de datos para las ordenes

```sh
docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
