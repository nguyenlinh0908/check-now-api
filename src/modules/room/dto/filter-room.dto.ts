import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class FilterRoomDto implements IPaginationOptions {
  @ApiProperty({ type: Number, default: 1, minimum: 1 })
  limit: number;

  @ApiProperty({ type: Number, default: 1, minimum: 1 })
  page: number;

  @ApiProperty({ type: String, required: false })
  name?: string;

  @ApiProperty({ type: Number, minimum: 0, required: false })
  minimum_price?: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  maximum_price?: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  province: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  district: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  ward: number;

  @ApiProperty({ type: String, default: 'price:desc' })
  order_by: string;

  price?: number;

  user?: string;
}
