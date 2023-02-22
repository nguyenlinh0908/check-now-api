import {
  IPaginationMeta,
  IPaginationOptions,
  IPaginationOptionsRoutingLabels,
  PaginationTypeEnum,
  TypeORMCacheType,
} from 'nestjs-typeorm-paginate';
import { ApiProperty } from '@nestjs/swagger';

export class FilterRoomDto implements IPaginationOptions {
  @ApiProperty({ type: Number, default: 10 })
  limit: number;

  @ApiProperty({ type: String, default: 1 })
  page: number;

  user: string;
}
