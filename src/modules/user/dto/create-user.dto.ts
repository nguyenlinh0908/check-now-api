import { Role } from 'src/modules/auth/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({})
  username: string;

  @ApiProperty({})
  password: string;

  @ApiProperty({})
  role: Role;
}
