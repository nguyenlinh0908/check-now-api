import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  user: string;

  @IsString()
  room: string;
}
