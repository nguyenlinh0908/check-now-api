import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: String, required: false })
  user?: string;

  @ApiProperty({ type: String, required: false })
  room?: string;

  author?: string;
}
