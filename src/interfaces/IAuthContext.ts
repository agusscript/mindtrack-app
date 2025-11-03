import { ISignUpFormValues, IUser } from "@/src/interfaces/IAuth";

export interface IAuthContext {
  handleSignIn: (username: string, password: string) => Promise<void>;
  handleSignUp: (signupValues: ISignUpFormValues) => Promise<void>;
  handleSignOut: () => void;
  isLoadingSignIn: boolean;
  isLoadingSignUp: boolean;
  user: IUser | undefined | null;
}
