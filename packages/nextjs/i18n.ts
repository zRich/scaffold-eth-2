import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["zh-CN", "en", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["common"],
    defaultNS: "common",
    //默认语言 zh-CN
    lng: "zh-CN",
    fallbackLng: ["zh-CN"],
  });

// 根据 语言代码 获取 语言名称
export const getLanguageName = (lang: string) => {
  switch (lang) {
    case "en":
      return "English";
    case "de":
      return "Deutsch";
    case "zh-CN":
      return "简体中文";
    default:
      return "简体中文";
  }
};

//切换语言，并且保存到localStorage
export const changeLanguage = (lang: string) => {
  localStorage.setItem("i18nextLng", lang);
  i18n.changeLanguage(lang);
};

export default i18n;
