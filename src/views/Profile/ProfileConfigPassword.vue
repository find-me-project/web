<template>
  <v-card width='100%' class='mt-5'>
    <v-card-title>
      {{ $t('UPDATE_PASSWORD') }}
    </v-card-title>

    <v-card-text>
      <v-form ref='form' v-model='formIsValid'>
        <v-text-field
          v-model='account.currentPassword'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          class='mt-3'
          :type='showPassword ? "text" : "password"'
          :label='$t("CURRENT_PASSWORD")'
          :append-icon='showPassword ? "mdi-eye" : "mdi-eye-off"'
          @click:append='togglePasswordVisibility'
        />

        <v-text-field
          v-model='account.newPassword'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          class='mt-3'
          :type='showPassword ? "text" : "password"'
          :label='$t("NEW_PASSWORD")'
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
        @click='updatePassword'
      >
        {{ $t('SAVE') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { updatePassword } from '@/API/Auth';

  export default {
    name: 'ProfileConfigPassword',
    data: function () {
      return {
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        formIsValid: true,
        showPassword: false,
        account: {
          currentPassword: undefined,
          newPassword: undefined,
        },
      };
    },
    methods: {
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      updatePassword: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        await updatePassword(this.account.currentPassword, this.account.newPassword);

        this.$emit('close');
      },
    },
  };
</script>
