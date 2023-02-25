import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class FilterFavoriteDto implements IPaginationOptions {
  limit: number;

  page: number;

  user?: number | string;
}
