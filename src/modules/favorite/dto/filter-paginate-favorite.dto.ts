import { PartialType } from '@nestjs/mapped-types';
import { UpdateFavoriteDto } from './update-favorite.dto';

export class FilterPaginateFavoriteDto extends PartialType(UpdateFavoriteDto) {}
