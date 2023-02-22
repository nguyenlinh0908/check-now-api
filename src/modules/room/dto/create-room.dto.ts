import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/models';
import { RoomType } from '../enum';

export class CreateRoomDto {
  @ApiProperty({ type: String, default: 'Phòng trọ 2n1k số 2 Đinh Liệt' })
  name: string;

  @ApiProperty({ type: String, default: 'Rộng rãi thoáng mát' })
  description: string;

  @ApiProperty({ type: String, default: '1' })
  province: string;

  @ApiProperty({ type: String, default: '1' })
  district: string;

  @ApiProperty({ type: String, default: '1' })
  ward: string;

  @ApiProperty({ type: String, default: 'Số 2 Đinh Liệt Hoàn Kiếm Hà Nội' })
  micro_address: string;

  @ApiProperty({ type: 'enum', default: RoomType.HOUSE })
  type: RoomType;

  @ApiProperty({ type: Number, default: 1200000, minimum: 0 })
  price: number;

  @ApiProperty({ type: String, default: 42, minimum: 1 })
  acreage: number;

  user: string;
}
