import { IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsString()
  room: string;
}
