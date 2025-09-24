import axios, { AxiosInstance, AxiosResponse } from "axios";

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
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.data?.message) {
          const message = Array.isArray(error.response.data.message)
            ? error.response.data.message.join(", ")
            : error.response.data.message;
          error.message = `HTTP ${error.response.status} - ${message}`;
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

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, {
      headers: config?.headers,
      timeout: config?.timeout,
    });
    return response.data;
  }
}

export const apiService = new ApiService(API_BASE_URL);
