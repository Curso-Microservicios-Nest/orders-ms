import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  create(createOrder: CreateOrderDto) {
    return this.order.create({ data: createOrder });
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const product = await this.order.findUnique({
      where: { id },
    });
    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Order not found`,
      });
    }
    return product;
  }
}
