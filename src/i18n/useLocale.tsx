import { useRouter } from "next/router";

export const useLocale = () => useRouter().locale;
