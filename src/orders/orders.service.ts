import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/config/services.enum';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';

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
    try {
      const { items: orderItems } = createOrder;

      const productIds = orderItems.map((item) => item.productId);
      const products = await firstValueFrom(
        this.productsClient.send({ cmd: 'validateProducts' }, productIds),
      );

      const totalAmount = orderItems.reduce((acc, orderItem) => {
        const price = products.find(
          (p: any) => p.id === orderItem.productId,
        ).price;
        return acc + price * orderItem.quantity;
      }, 0);

      const totalItems = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      const createOrderItems = orderItems.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        price: products.find((p: any) => p.id === item.productId).price,
      }));

      const order = await this.order.create({
        data: {
          totalAmount,
          totalItems,
          OrderItem: {
            createMany: { data: createOrderItems },
          },
        },
        include: {
          OrderItem: {
            select: { price: true, quantity: true, productId: true },
          },
        },
      });
      return {
        ...order,
        OrderItem: order.OrderItem.map((item) => ({
          ...item,
          product: products.find((p: any) => p.id === item.productId).name,
        })),
      };
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
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
    const order = await this.order.findUnique({
      where: { id },
      include: {
        OrderItem: {
          select: { productId: true, price: true, quantity: true },
        },
      },
    });
    if (!order) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Order not found`,
      });
    }
    const productIds = order.OrderItem.map((item) => item.productId);
    const products = await firstValueFrom(
      this.productsClient.send({ cmd: 'validateProducts' }, productIds),
    );
    return {
      ...order,
      OrderItem: order.OrderItem.map((item) => ({
        ...item,
        product: products.find((p: any) => p.id === item.productId).name,
      })),
    };
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
