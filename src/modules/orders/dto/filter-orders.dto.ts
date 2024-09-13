import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderStatus } from '../enums/order.enum';

export class FilterOrdersDto extends PaginationDto {
  @IsEnum(OrderStatus, {
    message: `Status must be a valid enum value: ${Object.values(OrderStatus).join(', ')}`,
  })
  @IsOptional()
  status?: OrderStatus;
}
