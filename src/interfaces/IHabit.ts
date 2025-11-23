export interface IHabit {
  id: number;
  title: string;
  isActive: boolean;
  notificationTime?: string | null;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateHabitDto {
  title: string;
  notificationTime?: string | null;
  userId: number;
}

export interface IUpdateHabitDto {
  title?: string;
  isActive?: boolean;
  notificationTime?: string | null;
}
