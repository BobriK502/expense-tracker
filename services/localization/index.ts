import { I18n } from "i18n-js";
import { getLocales } from 'expo-localization';

import { ru } from "./dictionaries/ru";
import { en } from "./dictionaries/en";

const i18n = new I18n({
  ru,
  en,
});

i18n.locale = getLocales()[0].languageCode ?? "ru";
i18n.enableFallback = true;

export const getText = (term: string): string => {
  return i18n.t(term);
}
