import {
  ITask,
  ICreateTaskDto,
  IUpdateTaskDto,
} from "@/src/interfaces/ITask";
import { ApiRequestConfig, apiService } from "@/src/services/api.service";

class TaskService {
  async getAllByUserId(
    userId: number,
    config?: ApiRequestConfig
  ): Promise<ITask[]> {
    return await apiService.get<ITask[]>(`/task/user/${userId}`, config);
  }

  async create(
    createTaskDto: ICreateTaskDto,
    config?: ApiRequestConfig
  ): Promise<ITask> {
    return await apiService.post<ITask>("/task", createTaskDto, config);
  }

  async update(
    id: number,
    updateTaskDto: IUpdateTaskDto,
    config?: ApiRequestConfig
  ): Promise<ITask> {
    return await apiService.patch<ITask>(`/task/${id}`, updateTaskDto, config);
  }

  async delete(id: number, config?: ApiRequestConfig): Promise<void> {
    return await apiService.delete<void>(`/task/${id}`, config);
  }
}

export const taskService = new TaskService();

