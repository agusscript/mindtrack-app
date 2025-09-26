export interface ISignUpFormValues {
  name: string;
  email: string;
  password: string;
}

export interface ISignInFormValues {
  email: string;
  password: string;
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
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: IUser;
}
