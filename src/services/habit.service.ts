import { ApiRequestConfig, apiService } from "@/src/services/api.service";
import { ICreateHabitDto, IHabit, IUpdateHabitDto } from "../interfaces/IHabit";

class HabitService {
  async getAllByUserId(
    userId: number,
    config?: ApiRequestConfig
  ): Promise<IHabit[]> {
    return await apiService.get<IHabit[]>(`/habit/user/${userId}`, config);
  }

  async create(
    createHabitDto: ICreateHabitDto,
    config?: ApiRequestConfig
  ): Promise<IHabit> {
    return await apiService.post<IHabit>("/habit", createHabitDto, config);
  }

  async update(
    id: number,
    updateHabitDto: IUpdateHabitDto,
    config?: ApiRequestConfig
  ): Promise<IHabit> {
    return await apiService.patch<IHabit>(
      `/habit/${id}`,
      updateHabitDto,
      config
    );
  }

  async delete(id: number, config?: ApiRequestConfig): Promise<void> {
    return await apiService.delete<void>(`/habit/${id}`, config);
  }
}

export const habitService = new HabitService();
