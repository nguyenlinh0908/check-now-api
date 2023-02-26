import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  url: string;
}
