import { apiService } from "@/src/services/api.service";
import { IQuote } from "@/src/interfaces/IQuote";

const QUOTE_API_URL = "https://zenquotes.io/api/today";
const TRANSLATE_API_URL = "https://api.mymemory.translated.net/get";

class QuoteService {
  async getTodayQuote(): Promise<IQuote> {
    try {
      const response = await apiService.get<IQuote[]>(QUOTE_API_URL);

      if (Array.isArray(response) && response.length > 0) {
        const quote = response[0];
        const translatedQuote = await this.translateText(quote.q);
        return {
          ...quote,
          q: translatedQuote,
        };
      }

      throw new Error("Empty quote response");
    } catch (error) {
      throw new Error(
        `QuoteService.getTodayQuote failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async translateText(
    text: string,
    targetLang: string = "es"
  ): Promise<string> {
    try {
      const response = await fetch(
        `${TRANSLATE_API_URL}?q=${encodeURIComponent(
          text
        )}&langpair=en|${targetLang}`
      );

      const data = await response.json();

      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }

      throw new Error("Translation failed");
    } catch (error) {
      throw new Error(
        `Translate error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const quoteService = new QuoteService();
