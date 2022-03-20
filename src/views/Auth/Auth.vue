<template>
  <v-container
    fluid
    fill-height
    class='pa-0 white'
  >
    <v-col
      md='7'
      class='pl-0 py-0 hidden-sm-and-down'
      style='height: 100%'
    >
      <v-container
        fluid
        fill-height
        fill-width
        class='primary'
      >
        <v-row align='center' justify='center'>
          <v-icon
            size='150'
            dark
          >
            mdi-star
          </v-icon>
        </v-row>
      </v-container>
    </v-col>
    <v-col sm='12' md='5'>
      <v-row align='center' justify='center'>
        <sign-in-step
          v-if='step === 0'
          @close='close'
          @sign-up='setSignUpStep'
          @recover-password='setRecoverPasswordStep'
        />

        <sign-in-recover-password-step
          v-if='step === 1'
          @sign-in='setSignInStep'
        />

        <sign-up-step
          v-else-if='step === 2'
          @sign-in='setSignInStep'
        />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'AuthPage',
    components: {
      SignInStep: () => import('./AuthSignIn.vue'),
      SignInRecoverPasswordStep: () => import('./AuthSignInRecoverPassword.vue'),
      SignUpStep: () => import('./AuthSignUp.vue'),
    },
    data: function () {
      return {
        step: 0,
      };
    },
    methods: {
      setSignInStep: function () {
        this.step = 0;
      },
      setRecoverPasswordStep: function () {
        this.step = 1;
      },
      setSignUpStep: function () {
        this.step = 2;
      },
      close: function () {
        this.$emit('close');
      },
      signIn: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });

        await axios({
          url: '/auth',
          method: 'GET',
          withCredentials: true,
        });

        this.$store.dispatch('loading/toggleLoading', { value: true });
      },
    },
  };
</script>
