import { ApiRequestConfig, apiService } from "@/src/services/api.service";
import {
  ISignInResponse,
  ISignUpResponse,
  ISignUpFormValues,
  ISignInFormValues,
  ISignOutFormValues,
  IRefreshTokenFormValues,
} from "@/src/interfaces/IAuth";

class AuthService {
  async signIn(
    values: ISignInFormValues,
    config?: ApiRequestConfig
  ): Promise<ISignInResponse> {
    return await apiService.post<ISignInResponse>(
      "/auth/sign-in",
      values,
      config
    );
  }

  async signUp(
    values: ISignUpFormValues,
    config?: ApiRequestConfig
  ): Promise<ISignUpResponse> {
    return await apiService.post<ISignUpResponse>(
      "/auth/sign-up",
      values,
      config
    );
  }

  async signOut(
    values: ISignOutFormValues,
    config?: ApiRequestConfig
  ): Promise<void> {
    return await apiService.post<void>("/auth/sign-out", values, config);
  }

  async refreshToken(
    values: IRefreshTokenFormValues,
    config?: ApiRequestConfig
  ) {
    return await apiService.post<ISignInResponse>(
      "/auth/refresh-token",
      values,
      config
    );
  }
}

export const authService = new AuthService();
