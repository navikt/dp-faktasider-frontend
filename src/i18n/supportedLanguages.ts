export const supportedLanguages = ["no", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
