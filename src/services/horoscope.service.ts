import { IHoroscope, IHoroscopeApiResponse } from "@/src/interfaces/IHoroscope";
import { translationService } from "@/src/services/translation.service";

const HOROSCOPE_API_URL =
  "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily";

const SIGN_MAP: Record<string, string> = {
  aries: "aries",
  tauro: "taurus",
  géminis: "gemini",
  cáncer: "cancer",
  leo: "leo",
  virgo: "virgo",
  libra: "libra",
  escorpio: "scorpio",
  sagitario: "sagittarius",
  capricornio: "capricorn",
  acuario: "aquarius",
  piscis: "pisces",
};

class HoroscopeService {
  async getDailyHoroscope(signSpanish: string): Promise<IHoroscope> {
    try {
      const signEnglish = SIGN_MAP[signSpanish.toLowerCase()];

      if (!signEnglish) {
        throw new Error(`Signo no válido: ${signSpanish}`);
      }

      const url = `${HOROSCOPE_API_URL}?sign=${signEnglish}&day=today`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const json: IHoroscopeApiResponse = await response.json();

      if (!json?.data || !json.success) {
        throw new Error("Formato inesperado en la respuesta");
      }

      const translatedHoroscope = await translationService.translate(
        json.data.horoscope_data
      );

      return {
        date: json.data.date,
        horoscope: translatedHoroscope,
        sign: signEnglish,
        signDisplay: signSpanish.charAt(0).toUpperCase() + signSpanish.slice(1),
      };
    } catch (error) {
      throw new Error(
        `HoroscopeService.getDailyHoroscope failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const horoscopeService = new HoroscopeService();
