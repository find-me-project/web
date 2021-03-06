/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-magic-numbers */
import Vue from 'vue';
import type {LocaleMessages} from 'vue-i18n';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = /([A-Za-z0-9-_]+)\./i.exec(key);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE ?? 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE ?? 'en',
  messages: loadLocaleMessages()
});
