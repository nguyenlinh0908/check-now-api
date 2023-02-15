import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty({ type: String, default: 'username', nullable: true })
  username?: string;

  @ApiProperty({ type: Number, default: 10 })
  limit: number;

  @ApiProperty({ type: String, default: 1 })
  page: number;
}
