export interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateTaskDto {
  title: string;
  userId: number;
}

export interface IUpdateTaskDto {
  title?: string;
  isCompleted?: boolean;
}

