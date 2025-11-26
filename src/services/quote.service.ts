import { apiService } from "@/src/services/api.service";
import { translationService } from "@/src/services/translation.service";
import { IQuote } from "@/src/interfaces/IQuote";

const QUOTE_API_URL = "https://zenquotes.io/api/today";

class QuoteService {
  async getTodayQuote(): Promise<IQuote> {
    try {
      const response = await apiService.get<IQuote[]>(QUOTE_API_URL);

      if (Array.isArray(response) && response.length > 0) {
        const quote = response[0];
        const translatedQuote = await translationService.translate(quote.q);
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
}

export const quoteService = new QuoteService();
