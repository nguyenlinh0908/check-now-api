import { ApiProperty } from '@nestjs/swagger';

export class UserLogoutDto {
  @ApiProperty({})
  accessToken?: string;

  @ApiProperty({})
  refreshToken?: string;
}
