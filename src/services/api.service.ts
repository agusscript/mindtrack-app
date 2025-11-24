import axios, { AxiosInstance } from "axios";
import { authService } from "./auth.service";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../context/AuthContext";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.initializeInterceptor();
  }

  private initializeInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = await getLocalStorageItem("refreshToken");

          if (!refreshToken) {
            return Promise.reject(error);
          }

          try {
            const data = await authService.refreshToken({ refreshToken });

            await setLocalStorageItem("accessToken", data.accessToken);

            this.setAuthentication(data.accessToken);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;

            return this.axiosInstance(originalRequest);
          } catch (e) {
            return Promise.reject(e);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }

  setAuthentication(accessToken: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
}

export const apiService = new ApiService(API_BASE_URL);
