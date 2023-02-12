import { ApiProperty } from '@nestjs/swagger';

export class GenAccessTokenDto {
  @ApiProperty({})
  refreshToken: string;
}
