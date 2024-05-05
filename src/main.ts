import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('MainOrders');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);

  logger.log(`🚀 Main running on PORT: ${envs.port}`);
}
bootstrap();
