import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { format as datefnsFormat } from "date-fns";
import { enGB, nb } from "date-fns/locale";
import React, { ReactNode } from "react";

i18n.use(initReactI18next).init({
  lng: "no",
  fallbackLng: "no",
  resources: {
    no: {
      kalkulator: require("../locales/no/kalkulator.json"),
      global: require("../locales/no/global.json"),
    },
    en: {
      kalkulator: require("../locales/en/kalkulator.json"),
      global: require("../locales/en/global.json"),
    },
  },
  ns: ["kalkulator", "global"],
  defaultNS: "global",
  returnObjects: true,
  interpolation: {
    format: function (value, format, lng) {
      const locale = lng === "en" ? enGB : nb;
      if (value instanceof Date) return datefnsFormat(value, format || "d. MMMM yyyy HH:mm", { locale });
      return value;
    },
    escapeValue: false, //not needed for react!!
  },
  keySeparator: false,
});

i18n.languages = ["en", "no"];

export const i18nextConfig = i18n;

export const TranslationsProvider = (props: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n} children={props.children} />
);
