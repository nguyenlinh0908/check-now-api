import { Role } from 'src/modules/auth/enums';

export class CreateUserDto {
  username: string;
  password: string;
  role: Role;
}
