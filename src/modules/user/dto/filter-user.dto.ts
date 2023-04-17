import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto implements IPaginationOptions {
  @ApiProperty({ type: Number, default: 1, minimum: 1 })
  limit: string | number;

  @ApiProperty({ type: Number, default: 1, minimum: 1 })
  page: string | number;

  @ApiProperty({ type: String, default: 'username', required: false })
  username?: string;

  @ApiProperty({ type: Number, required: false })
  id?: number;
}
