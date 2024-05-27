import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs } from 'src/config';
import { Services } from 'src/config/services.enum';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: Services.PRODUCT,
        transport: Transport.TCP,
        options: {
          host: envs.microservices.products.host,
          port: envs.microservices.products.port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
