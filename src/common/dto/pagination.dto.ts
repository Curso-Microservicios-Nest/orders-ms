import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Current page number', default: 1 })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;

  @ApiProperty({ description: 'Number of items per page', default: 10 })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10;
}
