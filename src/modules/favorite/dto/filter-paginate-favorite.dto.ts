import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class FilterPaginateFavoriteDto {
  limit?: number = 100;

  page?: number = 1;

  user?: number;
}
