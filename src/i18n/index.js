import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ms from "./ms.json";
import id from "./in.json";
import cn from "./cn.json";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ms: { translation: ms },
    id: { translation: id },
    cn: { translation: cn },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
