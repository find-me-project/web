/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.green.darken2,
        // secondary: colors.grey.darken1,
        accent: colors.green.lighten2,
        // error: colors.red.accent3,
      }
    }
  },
  lang: {
    locales: {
      // eslint-disable-next-line
      ptbr: require('vuetify/lib/locale/pt').default,
    },
    current: 'ptbr',
  },
});
