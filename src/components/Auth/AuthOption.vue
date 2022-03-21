<template>
  <div>
    <v-btn
      v-if='!isAuthenticated'
      depressed
      outlined
      color='primary'
      @click='openSignInDialog'
    >
      {{ $t('SIGN_IN') }}
    </v-btn>

    <auth-option-user-avatar v-else />

    <v-dialog
      v-model='signInDialogIsVisible'
      persistent
      fullscreen
      style='z-index: 9999'
    >
      <v-app-bar
        absolute
        collapse
        elevation='0'
        color='transparent'
        class='ma-3'
      >
        <v-tooltip right>
          <template #activator='{ on }'>
            <v-btn
              icon
              :color='$vuetify.breakpoint.mobile ? "primary" : "white"'
              v-on='on'
              @click.native='closeSigInDialog'
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('BACK') }}</span>
        </v-tooltip>
      </v-app-bar>

      <auth v-if='signInDialogIsVisible' @close='closeSigInDialog' />
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AuthOption',
    components: {
      Auth: () => import('@/views/Auth/Auth.vue'),
      AuthOptionUserAvatar: () => import('./AuthOptionUserAvatar.vue'),
    },
    data: function () {
      return {
        signInDialogIsVisible: false,
      };
    },
    computed: {
      ...mapGetters('auth', [
        'isAuthenticated',
      ]),
    },
    methods: {
      openSignInDialog: function () {
        this.signInDialogIsVisible = true;
      },
      closeSigInDialog: function () {
        this.signInDialogIsVisible = false;
      },
    },
  };
</script>
