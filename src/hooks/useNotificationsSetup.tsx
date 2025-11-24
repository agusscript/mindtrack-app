import { useEffect } from "react";
import { notificationService } from "@/src/services/notification.service";

export const useNotificationsSetup = () => {
  useEffect(() => {
    notificationService.requestPermissions().catch((error) => {
      console.error("Error al solicitar permisos de notificaciones:", error);
    });
  }, []);
};
