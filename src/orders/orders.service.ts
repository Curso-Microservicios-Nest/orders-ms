import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { Services } from 'src/config/services.enum';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  constructor(
    @Inject(Services.PRODUCT) private readonly productsClient: ClientProxy,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  async create(createOrder: CreateOrderDto) {
    const ids = [8, 9];
    const products = await firstValueFrom(
      this.productsClient.send({ cmd: 'validateProducts' }, ids),
    );
    return products;
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

  async changeStatus(changeOrderStatus: ChangeOrderStatusDto) {
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
