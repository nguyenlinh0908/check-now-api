import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ type: String, default: 'admin' })
  username: string;

  @ApiProperty({ type: String, default: 'root' })
  password: string;
}
