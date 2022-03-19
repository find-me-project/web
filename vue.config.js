module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    i18n: {
      locale: 'src/locales',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false,
    },
  },
};
