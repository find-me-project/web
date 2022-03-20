<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('RECOVER_PASSWORD')}}
    </v-card-title>

    <v-card-subtitle>
      {{$t('RECOVER_PASSWORD_SUBTITLE')}}
    </v-card-subtitle>

    <v-card-text>
      <v-form v-if='requestRecoverStep' ref='requestStep' v-model='requestStepFormIsValid'>
        <v-text-field
          v-model='account.email'
          :rules='[rules.required]'
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

      <v-form v-else ref='recoverStep' v-model='recoverStepFormIsValid'>
        <v-text-field
          v-model='account.email'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          :label='$t("EMAIL")'
        />

        <h5 class='mt-3'>
          {{$t('CODE')}}
        </h5>
        <v-otp-input
          v-model='account.code'
          :rules='[rules.required]'
          length='8'
          type='number'
          dense
          outlined
          hide-details
        />

        <v-text-field
          v-model='account.password'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          class='mt-3'
          :type='showPassword ? "text" : "password"'
          :label='$t("PASSWORD")'
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
        @click='recoverPassword'
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
  import { recoverPassword, requestRecoverPassword } from '@/API/Auth';

  export default {
    name: 'SignInRecoverPassword',
    data: function () {
      return {
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        byEmail: true,
        showPassword: false,
        requestRecoverStep: true,
        requestStepFormIsValid: true,
        recoverStepFormIsValid: true,
        account: {
          email: undefined,
          code: undefined,
          password: undefined,
        },
      };
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      signIn: function () {
        this.$emit('sign-in');
      },
      requestRecoverCode: async function () {
        this.requestStepFormIsValid = this.$refs.requestStep.validate();
        if (!this.requestStepFormIsValid) {
          return;
        }

        await requestRecoverPassword(this.account.email);

        this.requestRecoverStep = false;
      },
      recoverPassword: async function () {
        this.recoverStepFormIsValid = this.$refs.recoverStep.validate();
        if (!this.recoverStepFormIsValid) {
          return;
        }

        const {
          email,
          code,
          password,
        } = this.account;

        await recoverPassword(email, code, password);

        this.signIn();
      },
    },
  };
</script>
