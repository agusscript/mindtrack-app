import { ISignInResponse, ISignUpResponse, ISignUpFormValues, ISignInFormValues } from "@/src/interfaces/IAuth";
import { ApiRequestConfig, apiService } from "@/src/services/api.service";

class AuthService {
  async signIn(values: ISignInFormValues, config?: ApiRequestConfig): Promise<ISignInResponse> {
    return await apiService.post<ISignInResponse>(
      "/auth/sign-in",
      values,
      config
    );
  }

  async signUp(values: ISignUpFormValues, config?: ApiRequestConfig): Promise<ISignUpResponse> {
    return await apiService.post<ISignUpResponse>(
      "/auth/sign-up",
      values,
      config
    );
  }
}

export const authService = new AuthService();
