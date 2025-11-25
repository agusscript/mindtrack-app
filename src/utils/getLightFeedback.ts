import { Colors } from "@/constants/theme";

interface IGetLightFeedbackProps {
  lux: number | null;
  isAvailable: boolean;
}

interface IGetLightFeedbackResponse {
  message: string;
  color: string;
  icon: string;
}

const THRESHOLDS = {
  VERY_DARK: 20,
  DARK: 100,
  SOFT: 300,
  BRIGHT: 800,
  VERY_BRIGHT: 1500,
};

/**
 * Genera el mensaje y estilo de retroalimentación basado en el nivel de Lux.
 */
export function getLightFeedback({
  lux,
  isAvailable,
}: IGetLightFeedbackProps): IGetLightFeedbackResponse {
  if (lux === null || !isAvailable) {
    return {
      message: "Esperando datos del sensor de luz...",
      color: Colors.light.text,
      icon: "bulb-outline",
    };
  }

  if (lux < THRESHOLDS.VERY_DARK) {
    return {
      message:
        "Nivel de luz muy bajo. Ideal para descanso profundo, meditación o preparar tu cuerpo para un sueño reparador.",
      color: "#0A84FF",
      icon: "moon",
    };
  }

  if (lux < THRESHOLDS.DARK) {
    return {
      message:
        "Ambiente oscuro. Bueno para relajación o lectura ligera. Puede generar un poco de esfuerzo visual prolongado.",
      color: "#1B9AAA",
      icon: "moon-outline",
    };
  }

  if (lux < THRESHOLDS.SOFT) {
    return {
      message:
        "Iluminación suave interior. Ideal para tareas tranquilas, journaling, trabajo moderado o momentos de foco relajado.",
      color: Colors.light.tint,
      icon: "bulb-sharp",
    };
  }

  if (lux < THRESHOLDS.BRIGHT) {
    return {
      message:
        "Luz brillante interior. Perfecta para concentración, productividad y actividades que requieren mayor claridad visual.",
      color: "#F4A261",
      icon: "sunny",
    };
  }

  if (lux < THRESHOLDS.VERY_BRIGHT) {
    return {
      message:
        "Luz muy intensa. Quizás estés cerca de una ventana o en un ambiente exterior tenue. Favorece la concentración.",
      color: "#E76F51",
      icon: "sunny-outline",
    };
  }

  return {
    message:
      "Exposición extremadamente brillante. Si estás al sol directo, protege tus ojos y tu piel. Descansá la vista periódicamente.",
    color: "#D62828",
    icon: "warning-outline",
  };
}
