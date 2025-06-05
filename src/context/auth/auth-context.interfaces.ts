import type { ILoginForm } from '../../modules/auth/login/login.interfaces';
import type { IUser } from '../../types/user.interface';

export interface IAuthContext {
  user?: IUser | null;
  login?: (userData: ILoginForm) => void;
  logout?: () => void;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
