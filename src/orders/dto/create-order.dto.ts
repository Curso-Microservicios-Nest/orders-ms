import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '../enums/order.enum';

export class CreateOrderDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly totalItems: number;

  @IsEnum(OrderStatus, {
    message: `Status must be a valid enum value: ${Object.values(OrderStatus).join(', ')}`,
  })
  @IsOptional()
  readonly status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  readonly paid: boolean = false;
}
