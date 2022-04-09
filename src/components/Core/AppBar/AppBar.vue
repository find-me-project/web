<template>
  <v-app-bar
    app
    style='margin-bottom: 64px'
    elevation='0'
    clipped-left
  >
    <v-app-bar-title>
      <v-btn
        depressed
        text
        icon
        @click='goToHome'
      >
        <v-tooltip right>
          <template #activator='{ on }'>
            <v-icon color='primary' v-on='on'>
              mdi-home
            </v-icon>
          </template>
          {{ $t('HOME') }}
        </v-tooltip>
      </v-btn>
    </v-app-bar-title>

    <v-spacer />

    <auth-option />
  </v-app-bar>
</template>

<script>
  import { route } from '@/router';

  export default {
    name: 'AppBar',
    components: {
      AuthOption: () => import('../../Auth/AuthOption.vue'),
    },
    data: function () {
      return {
        route: route,
      };
    },
    methods: {
      goToHome: function () {
        if (this.$router.currentRoute.name !== this.route.home) {
          this.$router.push({ name: this.route.home });
        }
      },
    },
  };
</script>
