import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../enums';

export class CreateRoomDto {
  @ApiProperty({ type: String, default: 'Phòng trọ 2n1k số 2 Đinh Liệt' })
  name: string;

  @ApiProperty({ type: String, default: 'Rộng rãi thoáng mát' })
  description: string;

  @ApiProperty({ type: Number, default: 1 })
  province: number;

  @ApiProperty({ type: Number, default: 1 })
  district: number;

  @ApiProperty({ type: Number, default: 1 })
  ward: number;

  @ApiProperty({ type: String, default: 'Số 2 Đinh Liệt Hoàn Kiếm Hà Nội' })
  micro_address: string;

  @ApiProperty({ type: 'enum', default: RoomType.HOUSE })
  type: RoomType;

  @ApiProperty({ type: Number, default: 1200000, minimum: 0 })
  price: number;

  @ApiProperty({ type: String, default: 42, minimum: 1 })
  acreage: number;

  @ApiProperty({ type: Number })
  expired: number | Date;

  user: string;
}
