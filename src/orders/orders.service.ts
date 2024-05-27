import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  create(createOrder: CreateOrderDto) {
    return {
      service: 'OrdersService',
      CreateOrderDto: createOrder,
    };
    //return this.order.create({ data: createOrder });
  }

  async findAll(filters: FilterOrdersDto) {
    const { limit, page, status } = filters;

    const total = await this.order.count({ where: { status } });
    const lastPage = Math.ceil(total / limit);

    const data = await this.order.findMany({
      where: { status },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      meta: { page, total, lastPage },
      data,
    };
  }

  async findOne(id: string) {
    const order = await this.order.findUnique({ where: { id } });
    if (!order) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Order not found`,
      });
    }
    return order;
  }

  async changeStatus(changeOrderStatus) {
    const { id, status } = changeOrderStatus;
    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }
    return this.order.update({
      where: { id },
      data: { status },
    });
  }
}
