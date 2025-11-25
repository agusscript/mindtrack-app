import { Colors } from "@/constants/theme";
import { IWeather } from "@/src/interfaces/IWeather";

interface IGetWeatherFeedbackProps {
  weather: IWeather | null;
}

interface IGetWeatherFeedbackResponse {
  message: string;
  color: string;
  icon: string;
}

const TEMPERATURE_THRESHOLDS = {
  FREEZING: 5,
  COLD: 12,
  COOL: 18,
  WARM: 24,
  HOT: 28,
  VERY_HOT: 35,
};

const WIND_THRESHOLDS = {
  CALM: 10,
  LIGHT: 20,
  MODERATE: 30,
  STRONG: 50,
};

/**
 * Genera el mensaje y estilo de bienestar basado en las condiciones climáticas.
 */
export function getWeatherFeedback({
  weather,
}: IGetWeatherFeedbackProps): IGetWeatherFeedbackResponse {
  if (!weather) {
    return {
      message: "Esperando datos del clima...",
      color: Colors.light.text,
      icon: "cloud-outline",
    };
  }

  const { temperature, wind, weatherCode } = weather;

  if (weatherCode >= 95) {
    return {
      message:
        "⚡ Hay tormenta eléctrica. Quedate en un lugar seguro, alejado de ventanas y objetos metálicos. Es buen momento para actividades tranquilas en casa.",
      color: "#7B2CBF",
      icon: "thunderstorm",
    };
  }

  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return {
      message:
        "❄️ Está nevando. Si salís, abrigate muy bien y tené cuidado con superficies resbaladizas. Ideal para un chocolate caliente y reflexión personal.",
      color: "#90E0EF",
      icon: "snow",
    };
  }

  if (
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 67 ||
    weatherCode === 82
  ) {
    return {
      message:
        "🌧️ Lluvia intensa. Evitá salir si no es necesario. Aprovechá para organizar tu espacio, leer o practicar hobbies creativos en casa.",
      color: "#0077B6",
      icon: "rainy",
    };
  }

  if (
    (weatherCode >= 51 && weatherCode <= 57) ||
    weatherCode === 61 ||
    weatherCode === 66 ||
    weatherCode === 80 ||
    weatherCode === 81
  ) {
    return {
      message:
        "☔ Día lluvioso. Excelente para actividades tranquilas en casa como meditar, escribir un diario o disfrutar música relajante.",
      color: "#48CAE4",
      icon: "umbrella",
    };
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return {
      message:
        "🌫️ Hay niebla. Si necesitás manejar, hacelo con precaución. El clima misterioso invita a la introspección y momentos de calma.",
      color: "#ADB5BD",
      icon: "cloud",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.VERY_HOT) {
    return {
      message:
        "🔥 Calor extremo. Evitá actividades físicas intensas, hidratate constantemente y buscá lugares frescos. Cuidá a niños y adultos mayores.",
      color: "#D62828",
      icon: "flame",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.HOT) {
    return {
      message:
        "☀️ Hace calor. Hidratate bien, usá protector solar y evitá la exposición prolongada al sol. Ideal para actividades acuáticas o en sombra.",
      color: "#F77F00",
      icon: "sunny",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.WARM) {
    return {
      message:
        "🌤️ Clima cálido y agradable. Perfecto para ejercicio al aire libre, caminatas o disfrutar de un parque. ¡Aprovechá el buen tiempo!",
      color: "#FCBF49",
      icon: "partly-sunny",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.COOL) {
    return {
      message:
        "🍃 Temperatura ideal. Excelente para cualquier actividad: correr, yoga al aire libre o simplemente pasear. Tu cuerpo lo agradecerá.",
      color: Colors.light.tint,
      icon: "leaf",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.COLD) {
    return {
      message:
        "🧥 Hace fresco. Usá varias capas de ropa y disfrutá de bebidas calientes. Buen momento para ejercicio moderado que genere calor corporal.",
      color: "#1B9AAA",
      icon: "shirt",
    };
  }

  if (temperature >= TEMPERATURE_THRESHOLDS.FREEZING) {
    return {
      message:
        "❄️ Hace frío. Abrigate bien con varias capas. Tomate un té caliente y mantenete activo para generar calor. Cuidá las extremidades.",
      color: "#0A84FF",
      icon: "thermometer",
    };
  }

  if (temperature < TEMPERATURE_THRESHOLDS.FREEZING) {
    return {
      message:
        "🥶 Temperatura muy baja. Limitá el tiempo al exterior, abrigate con capas térmicas y protegé rostro y manos. Actividades indoor son ideales.",
      color: "#CAF0F8",
      icon: "snow",
    };
  }

  if (wind >= WIND_THRESHOLDS.STRONG) {
    return {
      message:
        "💨 Viento muy fuerte. Evitá zonas con objetos que puedan caer. Si salís, protegé tus ojos del polvo. Mejor quedarse en interiores.",
      color: "#6C757D",
      icon: "warning",
    };
  }

  if (wind >= WIND_THRESHOLDS.MODERATE) {
    return {
      message:
        "💨 Está ventoso. Ideal para caminar pero evitá zonas abiertas si te molesta el viento. Perfecto para volar cometas o deportes de vela.",
      color: "#ADB5BD",
      icon: "flag",
    };
  }

  if (weatherCode <= 1) {
    return {
      message:
        "🌞 Día despejado y hermoso. Gran momento para cargar energía con una caminata, hacer ejercicio al aire libre o simplemente disfrutar del sol.",
      color: "#FFD166",
      icon: "sunny",
    };
  }

  if (weatherCode === 2) {
    return {
      message:
        "⛅ Parcialmente nublado. Clima versátil para cualquier actividad. Las nubes ofrecen respiro del sol directo. ¡Buen día para todo!",
      color: "#83C5BE",
      icon: "partly-sunny",
    };
  }

  if (weatherCode === 3) {
    return {
      message:
        "☁️ Día nublado. Ideal para actividades al aire libre sin preocuparte por el sol. Perfecto para fotografía o paseos relajados.",
      color: "#6D6875",
      icon: "cloudy",
    };
  }

  return {
    message:
      "✨ Clima estable. Podés elegir cualquier actividad que te haga bien. Escuchá tu cuerpo y disfrutá el día.",
    color: Colors.light.tint,
    icon: "sparkles",
  };
}
