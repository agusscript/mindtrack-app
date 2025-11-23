export interface IHabit {
  id: number;
  title: string;
  isActive: boolean;
  notificationTime?: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateHabitDto {
  title: string;
  notificationTime?: string;
  userId: number;
}

export interface IUpdateHabitDto {
  title?: string;
  isActive?: boolean;
  notificationTime?: string;
}
