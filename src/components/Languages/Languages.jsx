import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationES from "/src/locales/es.json";
import translationEN from "/src/locales/en.json";
import translationPT from "/src/locales/por.json";

const savedLang =
  localStorage.getItem("lang") || navigator.language.slice(0, 2);

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: translationES },
    en: { translation: translationEN },
    pt: { translation: translationPT },
  },
  lng: savedLang,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
