export interface ISignUpFormValues {
  name: string;
  email: string;
  password: string;
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignOutFormValues {
  refreshToken: string;
}

export interface IRefreshTokenFormValues {
  refreshToken: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ISignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
