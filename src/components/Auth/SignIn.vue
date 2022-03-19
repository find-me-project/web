<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('SIGN_IN')}}
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          dense
          outlined
          hide-details
          :label='$t(byEmail ? "EMAIL" : "NICKNAME")'
        />

        <v-text-field
          dense
          outlined
          hide-details
          class='mt-3'
          :type='showPassword ? "text" : "password"'
          :label='$t("PASSWORD")'
          :append-icon='showPassword ? "mdi-eye" : "mdi-eye-off"'
          @click:append='togglePasswordVisibility'
        />

        <v-row class='pa-0 ma-0 mt-1' justify='end'>
          <v-btn
            dense
            text
            small
            color='primary'
            @click='recoverPassword'
          >
            {{$t('FORGOT_PASSWORD')}}
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-btn
        block
        depressed
        color='primary'
      >
        {{$t('SIGN_IN')}}
      </v-btn>

      <v-btn
        block
        depressed
        outlined
        class='mt-3'
        color='primary'
        @click='signUp'
      >
        {{$t('SIGN_UP')}}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SignIn',
    data: function () {
      return {
        byEmail: true,
        showPassword: false,
      };
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      signUp: function () {
        this.$emit('sign-up');
      },
      recoverPassword: function () {
        this.$emit('recover-password');
      },
    },
  };
</script>
