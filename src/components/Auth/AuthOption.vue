<template>
  <div>
    <v-btn depressed outlined @click='openSignInDialog'>
      {{$t('SIGN_IN')}}
    </v-btn>

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
          <template v-slot:activator='{ on }'>
            <v-btn
              icon
              :color='$vuetify.breakpoint.mobile ? "primary" : "white"'
              v-on='on'
              @click.native='closeSigInDialog'
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>{{$t('BACK')}}</span>
        </v-tooltip>
      </v-app-bar>

      <sign-in v-if='signInDialogIsVisible' @close='closeSigInDialog' />
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AuthOption',
    components: {
      SignIn: () => import('@/views/Auth/SignIn.vue'),
    },
    data: function () {
      return {
        signInDialogIsVisible: false,
      };
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
