import type { RolesEnum } from './roles.enum';

export interface IUser {
  email: string;
  name: string;
  lastName: string;
  role: RolesEnum;
}
