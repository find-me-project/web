<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('RECOVER_PASSWORD')}}
    </v-card-title>

    <v-card-subtitle>
      {{$t('RECOVER_PASSWORD_SUBTITLE')}}
    </v-card-subtitle>

    <v-card-text>
      <v-form v-if='requestRecoverStep'>
        <v-text-field
          dense
          outlined
          hide-details
          :label='$t("EMAIL")'
        />

        <v-btn
          block
          color='primary'
          class='mt-3'
          @click='requestRecoverCode'
        >
          {{$t('REQUEST_RECOVER_CODE')}}
        </v-btn>

      </v-form>

      <v-form v-else>
        <v-text-field
          dense
          outlined
          hide-details
          :label='$t("EMAIL")'
        />

        <h5 class='mt-3'>
          {{$t('CODE')}}
        </h5>
        <v-otp-input
          length='8'
          type='number'
          dense
          outlined
          hide-details
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

        <v-text-field
          dense
          outlined
          hide-details
          class='mt-3'
          :type='showPassword ? "text" : "password"'
          :label='$t("CONFIRM_PASSWORD")'
          :append-icon='showPassword ? "mdi-eye" : "mdi-eye-off"'
          @click:append='togglePasswordVisibility'
        />
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-btn
        v-if='!requestRecoverStep'
        block
        depressed
        color='primary'
      >
        {{$t('RECOVER_PASSWORD')}}
      </v-btn>

      <v-btn
        block
        depressed
        outlined
        class='mt-3'
        color='primary'
        @click='signIn'
      >
        {{$t('SIGN_IN')}}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SignInRecoverPassword',
    data: function () {
      return {
        byEmail: true,
        showPassword: false,
        requestRecoverStep: true,
      };
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      signIn: function () {
        this.$emit('sign-in');
      },
      requestRecoverCode: function () {
        this.requestRecoverStep = false;
      },
    },
  };
</script>
