import { IWeather, IOpenMeteoResponse } from "@/src/interfaces/IWeather";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

// Buenos Aires
const DEFAULT_COORDS = {
  latitude: -34.61,
  longitude: -58.38,
};

const WEATHER_CODE_MAP: Record<number, string> = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Niebla",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  56: "Llovizna helada ligera",
  57: "Llovizna helada intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia intensa",
  66: "Lluvia helada ligera",
  67: "Lluvia helada intensa",
  71: "Nevada ligera",
  73: "Nevada moderada",
  75: "Nevada intensa",
  77: "Granizo",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos violentos",
  85: "Nevada ligera con chubascos",
  86: "Nevada intensa con chubascos",
  95: "Tormenta eléctrica",
  96: "Tormenta con granizo ligero",
  99: "Tormenta con granizo intenso",
};

class WeatherService {
  private mapWeatherCode(code: number): string {
    return WEATHER_CODE_MAP[code] ?? "Clima variable";
  }

  async getCurrentWeather(
    latitude: number = DEFAULT_COORDS.latitude,
    longitude: number = DEFAULT_COORDS.longitude
  ): Promise<IWeather> {
    try {
      const url = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      const response = await fetch(url);
      const json: IOpenMeteoResponse = await response.json();

      if (!json.current_weather) {
        throw new Error("No weather data received from API");
      }

      const w = json.current_weather;

      return {
        temperature: w.temperature,
        wind: w.windspeed,
        humidity: json.current_weather_units?.relativehumidity_2m ?? 60,
        description: this.mapWeatherCode(w.weathercode),
        weatherCode: w.weathercode,
      };
    } catch (error) {
      throw new Error(
        `WeatherService.getCurrentWeather failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const weatherService = new WeatherService();
