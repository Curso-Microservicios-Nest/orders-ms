import {
  Controller,
  NotImplementedException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrdersDto } from './dto/filter-orders.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create')
  create(@Payload() createOrder: CreateOrderDto) {
    return this.ordersService.create(createOrder);
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
  changeStatus() {
    throw new NotImplementedException('Method not implemented.');
  }
}
