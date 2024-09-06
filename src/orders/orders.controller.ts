import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create')
  async create(@Payload() createOrder: CreateOrderDto) {
    const order = await this.ordersService.create(createOrder);
    const payment = await this.ordersService.createPaymentOrder(order);
    return { order, payment };
  }

  @MessagePattern('findAll')
  findAll(@Payload() filters: FilterOrdersDto) {
    return this.ordersService.findAll(filters);
  }

  @MessagePattern('findOne')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeStatus')
  changeStatus(@Payload() changeOrderStatus: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatus);
  }
}
