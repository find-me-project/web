<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('SIGN_IN')}}
    </v-card-title>

    <v-card-text>
      <v-form ref='form' v-model='formIsValid'>
        <v-text-field
          v-model='account.data'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          :label='$t(signInByNickname ? "NICKNAME" : "EMAIL")'
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
        @click='signIn'
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
    name: 'AuthSignIn',
    data: function () {
      return {
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        signInByNickname: false,
        showPassword: false,
        account: {
          data: undefined,
          password: undefined,
        },
        formIsValid: true,
      };
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      signIn: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        await this.$store.dispatch('auth/signIn', {
          accessData: this.account.data,
          password: this.account.password,
          isNickname: this.signInByNickname,
        });

        this.$emit('close');
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
