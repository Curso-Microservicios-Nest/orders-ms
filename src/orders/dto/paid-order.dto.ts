import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class PaidOrderDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsNumber()
  @IsNotEmpty()
  totalPaid: number;

  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;
}
