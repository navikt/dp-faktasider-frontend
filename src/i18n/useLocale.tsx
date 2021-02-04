import { useRouter } from "next/router";
import { SupportedLanguage } from "./supportedLanguages";

export const useLocale = () => useRouter().locale as SupportedLanguage;
