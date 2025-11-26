const TRANSLATE_API_URL = "https://api.mymemory.translated.net/get";

class TranslationService {
  async translate(
    text: string,
    sourceLang: string = "en",
    targetLang: string = "es"
  ): Promise<string> {
    try {
      const response = await fetch(
        `${TRANSLATE_API_URL}?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await response.json();

      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }

      console.warn("Translation failed, returning original text");
      return text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  }
}

export const translationService = new TranslationService();
