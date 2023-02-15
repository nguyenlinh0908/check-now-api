import { Role } from 'src/modules/auth/enums';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../enums';

export class CreateUserDto {
  @ApiProperty({ type: String, default: 'username' })
  username: string;

  @ApiProperty({ type: String, default: 'password' })
  password: string;

  @ApiProperty({ type: String, default: 'Nguyễn Văn A' })
  fullName: string;

  @ApiProperty({ type: String, default: 'Định Công - Hoàng Mai - Hà Nội' })
  address: string;

  @ApiProperty({ type: Number, default: 1676448433000 })
  dateOfBirth: number;

  @ApiProperty({ type: String, default: GenderEnum.MALE })
  gender: GenderEnum;

  @ApiProperty({ type: String, default: '0366537938' })
  phone: string;

  @ApiProperty({ type: String, default: Role.USER })
  role: Role;
}
