import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class ChangeOrderStatusDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly id: string;

  @IsEnum(OrderStatus, {
    message: `Status must be a valid enum value: ${Object.values(OrderStatus).join(', ')}`,
  })
  @IsNotEmpty()
  status: OrderStatus;
}
