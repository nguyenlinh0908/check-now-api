import { ApiProperty } from '@nestjs/swagger';
import { MediaTag } from '../enum';

export class CreateMediaDto {
  title: string;

  url: string;

  type: string;

  user?: string;

  room?: string;

  tag: MediaTag;

  author: string;
}
