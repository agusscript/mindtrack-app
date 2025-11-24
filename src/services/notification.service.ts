import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface ScheduleNotificationParams {
  habitId: number;
  habitTitle: string;
  time: string;
}

class NotificationService {
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return false;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("habits", {
          name: "Recordatorios de Hábitos",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: "default",
        });
      }

      return true;
    } catch (error) {
      console.error("Error al solicitar permisos de notificaciones:", error);
      return false;
    }
  }

  async hasPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error al verificar permisos:", error);
      return false;
    }
  }

  async scheduleHabitNotification({
    habitId,
    habitTitle,
    time,
  }: ScheduleNotificationParams): Promise<string | null> {
    try {
      const hasPermission = await this.hasPermissions();
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) {
          throw new Error("Permisos de notificación no concedidos");
        }
      }

      const [hours, minutes] = time.split(":").map(Number);

      if (
        isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
      ) {
        throw new Error(`Hora inválida: ${time}`);
      }

      await this.cancelHabitNotification(habitId);

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Recordatorio de Hábito",
          body: `Es hora de: ${habitTitle}`,
          sound: true,
          data: { habitId },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      return notificationId;
    } catch (error) {
      console.error("Error al programar notificación:", error);
      throw error;
    }
  }

  async cancelHabitNotification(habitId: number): Promise<void> {
    try {
      const scheduledNotifications =
        await Notifications.getAllScheduledNotificationsAsync();

      const habitNotification = scheduledNotifications.find(
        (notification) => notification.content.data?.habitId === habitId
      );

      if (habitNotification) {
        await Notifications.cancelScheduledNotificationAsync(
          habitNotification.identifier
        );
      }
    } catch (error) {
      console.error("Error al cancelar notificación:", error);
      throw error;
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Error al cancelar todas las notificaciones:", error);
      throw error;
    }
  }

  async restoreHabitNotifications(
    habits: {
      id: number;
      title: string;
      notificationTime: string | null;
      isActive: boolean;
    }[]
  ): Promise<void> {
    try {
      const hasPermission = await this.hasPermissions();
      if (!hasPermission) {
        return;
      }

      await this.cancelAllNotifications();

      for (const habit of habits) {
        if (habit.notificationTime && habit.isActive) {
          await this.scheduleHabitNotification({
            habitId: habit.id,
            habitTitle: habit.title,
            time: habit.notificationTime,
          });
        }
      }
    } catch (error) {
      console.error("Error al restaurar notificaciones:", error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
