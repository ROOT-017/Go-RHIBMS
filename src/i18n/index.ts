import i18n from 'i18next';
import { QUERY } from '../utils/queryStr';
import { getLanguage, setLanguage } from '../storage/local.storage';
import HttpApi from 'i18next-http-backend';

const userLang =
  QUERY.parse()?.lang ||
  getLanguage() ||
  navigator.language ||
  (
    navigator as unknown as {
      userLanguage: string;
    }
  ).userLanguage;
const lng = userLang?.includes('-') ? userLang.split('-')[0] : userLang;

if (lng) {
  setLanguage(lng);
}

const backendOptions = {
  loadPath: '/locales/{{lng}}.json',
  parse: function (data: string) {
    return JSON.parse(data);
  },
};

i18n.use(HttpApi).init({
  backend: backendOptions,
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  react: {
    useSuspense: true,
  },
});

i18n.on('initialized', function () {
  i18n.changeLanguage(lng, () => {});
});
export const supportedLanguages = ['en', 'fr', 'de'];
export default i18n;
