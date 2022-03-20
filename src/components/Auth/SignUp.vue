<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('SIGN_UP')}}
    </v-card-title>

    <v-card-text>
      <v-form ref='form' v-model='formIsValid'>
        <v-text-field
          v-model='account.name'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          :label='$t("NAME")'
        />

        <v-text-field
          v-model='account.nickname'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          class='mt-3'
          :label='$t("NICKNAME")'
        />

        <v-menu
          ref='menu'
          v-model='menu'
          :close-on-content-click='false'
          transition='scale-transition'
          offset-y
          min-width='auto'
        >
          <template v-slot:activator='{ on, attrs }'>
            <v-text-field
              v-model='account.birthDate'
              :rules='[rules.required]'
              :label='$t("BIRTH_DATE")'
              readonly
              dense
              outlined
              hide-details
              class='mt-3'
              v-bind='attrs'
              v-on='on'
            ></v-text-field>
          </template>
          <v-date-picker
            v-model='account.birthDate'
            :active-picker.sync='activePicker'
            :max='maxDate'
            min='1950-01-01'
            @change='setBirthDate'
          ></v-date-picker>
        </v-menu>

        <v-text-field
          v-model='account.email'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          class='mt-3'
          :label='$t("EMAIL")'
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
          @keydown.enter='signUp'
        />
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-btn
        block
        depressed
        color='primary'
        @click='signUp'
      >
        {{$t('SIGN_UP')}}
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
  import { signUp } from '@/API/Auth';

  export default {
    name: 'SignUp',
    data: function () {
      return {
        formIsValid: true,
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        menu: false,
        activePicker: null,
        maxDate: (
          new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
        ).toISOString().substr(0, 10),
        byEmail: true,
        showPassword: false,
        account: {
          name: undefined,
          nickname: undefined,
          birthDate: undefined,
          email: undefined,
          password: undefined,
        },
      };
    },
    watch: {
      menu: function () {
        setTimeout(() => {
          this.activePicker = 'YEAR';
        });
      },
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      setBirthDate: function (date) {
        this.$refs.menu.save(date);
      },
      signIn: function () {
        this.$emit('sign-in');
      },
      signUp: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        const {
          name,
          nickname,
          birthDate,
          email,
          password,
        } = this.account;

        await signUp(name, nickname, email, password, birthDate);

        this.$emit('sign-in');
      },
    },
  };
</script>
