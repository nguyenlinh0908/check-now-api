import { Role } from '../enums';

export interface ICurrentUser {
  id: string;
  username: string;
  role: Role;
}
