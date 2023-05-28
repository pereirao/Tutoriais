import I18n from 'i18n-js';
import en from './en';

I18n.locale = 'en';
I18n.fallback = true;

const prev_en = I18n.translations.en || {};
I18n.translations = {
  en: {
    ...prev_en,
    ...en
  }
};

export default I18n;
