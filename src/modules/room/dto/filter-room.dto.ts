import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../enums';
export class FilterRoomDto {
  @ApiProperty({ type: Number, minimum: 1, required: false })
  province: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  district: number;

  @ApiProperty({ type: Number, minimum: 1, required: false })
  ward: number;

  @ApiProperty({ type: RoomType, required: false })
  type: RoomType;

  @ApiProperty({ type: String, default: 'price:desc' })
  order_by: string;

  price?: number;

  user?: string;
}
