import type { ILoginForm } from '../../modules/auth/login/login.interfaces';
import type { IUser } from '../../types/user.interfaces';

export interface IAuthContext {
  user?: IUser | null;
  login?: (userData: ILoginForm) => void;
  logout?: () => void;
  updateLoggedUser?: (user: IUser | null) => void;
  isLoggingIn?: boolean;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
