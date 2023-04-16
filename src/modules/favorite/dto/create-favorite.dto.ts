import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsNumber()
  user?: number;

  @IsNumber()
  room?: number;
}
