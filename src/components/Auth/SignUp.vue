<template>
  <v-card flat width='60%'>
    <v-card-title>
      {{$t('SIGN_UP')}}
    </v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          dense
          outlined
          hide-details
          :label='$t("NAME")'
        />

        <v-text-field
          dense
          outlined
          hide-details
          class='mt-3'
          :label='$t("NICKNAME")'
        />

        <v-text-field
          dense
          outlined
          hide-details
          class='mt-3'
          :label='$t("BIRTH_DATE")'
        />

        <v-text-field
          dense
          outlined
          hide-details
          class='mt-3'
          :label='$t("EMAIL")'
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
        block
        depressed
        color='primary'
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
  export default {
    name: 'SignUp',
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
      signIn: function () {
        this.$emit('sign-in');
      },
    },
  };
</script>
